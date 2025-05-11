import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email: string, password: string, rememberMe: boolean = false) {
      // In a real app, you would make an API call here
      console.log('Login attempt', { email, password, rememberMe })

      // For demo purposes, simulate a successful login
      this.user = {
        id: '1',
        email,
        name: 'Demo User',
      }
      this.isAuthenticated = true

      // Store auth token in localStorage if rememberMe is true
      if (rememberMe) {
        localStorage.setItem('auth_token', 'demo_token')
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },

    async register(email: string, password: string) {
      // In a real app, you would make an API call here
      console.log('Register attempt', { email, password })

      // For demo purposes, just return success
      return true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    },

    checkAuth() {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },
  },
})

// Helper hook that can be used to get auth-related functionality
export const useAuth = () => {
  const authStore = useAuthStore()

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    checkAuth: authStore.checkAuth,
  }
}
