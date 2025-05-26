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
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async login(email: string, password: string, rememberMe: boolean = false) {
      this.loading = true
      this.error = null
      try {
        console.log('Login attempt', { email, password, rememberMe })

        this.user = {
          id: '1',
          email,
          name: 'Demo User',
        }
        this.isAuthenticated = true

        if (rememberMe) {
          localStorage.setItem('auth_token', 'demo_token')
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error = err.message
          console.error(err.message)
        } else {
          this.error = 'Unbekannter Fehler beim Login'
          console.error(err)
        }
      } finally {
        this.loading = false
      }
    },

    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        console.log('Register attempt', { email, password })

        // Simuliere erfolgreiche Registrierung
        return true
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error = err.message
          console.error(err.message)
        } else {
          this.error = 'Registrierung fehlgeschlagen'
          console.error(err)
        }
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    },

    checkAuth() {
      try {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('user')

        if (token && user) {
          this.user = JSON.parse(user)
          this.isAuthenticated = true
        }
      } catch (err) {
        console.error('Fehler beim Auth-Check:', err)
        this.logout()
      }
    },
  },
})

// Helper
export const useAuth = () => {
  const authStore = useAuthStore()

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    loading: authStore.loading,
    error: authStore.error,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    checkAuth: authStore.checkAuth,
  }
}
