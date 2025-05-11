<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">Sign In</h2>

      <div class="social-buttons">
        <button @click="handleSocialLogin('Google')" class="social-button google">
          <img src="@/assets/google-logo.svg" alt="Google" class="social-icon" />
          Continue with Google
        </button>
        <button @click="handleSocialLogin('Facebook')" class="social-button facebook">
          <img src="@/assets/facebook-logo.svg" alt="Facebook" class="social-icon" />
          Continue with Facebook
        </button>
        <button @click="handleSocialLogin('Apple')" class="social-button apple">
          <img src="@/assets/apple-logo.svg" alt="Apple" class="social-icon" />
          Continue with Apple
        </button>
      </div>

      <div class="divider">
        <span>or</span>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input v-model="email" type="email" id="email" required class="input" />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" required class="input" />
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" class="checkbox" />
            <span>Stay signed in</span>
          </label>

          <router-link to="/forgot-password" class="forgot-password"> Forgot password? </router-link>
        </div>

        <button type="submit" class="submit-button primary">Sign In</button>
      </form>

      <p class="signup-link">
        Don't have an account?
        <router-link to="/register" class="link">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore.ts'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()
const { login } = useAuthStore()

const handleSubmit = async () => {
  try {
    await login(email.value, password.value, rememberMe.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const handleSocialLogin = (provider: string) => {
  alert(`Login with ${provider} will be supported soon`)
}
</script>

<style scoped>
/* global.css oder in App.vue */

/* Definiere die globalen CSS-Variablen */
:root {
  --text-primary: #333333; /* Dunkles Grau für Text */
  --text-secondary: #888888; /* Helles Grau für sekundären Text */
  --bg-primary: #ffffff; /* Weiß für Hintergrund */
  --bg-secondary: #f7f7f7; /* Helles Grau für sekundären Hintergrund */
  --border-color: #e0e0e0; /* Hellgrau für Border */
  --primary-color: #3b82f6; /* Blau für primäre Akzentfarbe */
  --secondary-color: #d1d5db; /* Helles Blau für sekundäre Akzentfarbe */
  --error-color: #ef4444; /* Rot für Fehler */
  --success-color: #10b981; /* Grün für Erfolg */
  --input-focus-color: #3b82f6; /* Blau für fokussierte Eingabefelder */
  --shadow-color: rgba(0, 0, 0, 0.1); /* Schattenfarbe */
}

/* Die Login-Seite */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
}

.login-box {
  width: 100%;
  max-width: 400px;
  background-color: var(--bg-primary);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.social-button:hover {
  background-color: var(--bg-secondary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--border-color);
}

.divider span {
  padding: 0 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  width: 100%;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
}

.input:focus {
  outline: none;
  border-color: var(--input-focus-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1); /* optional focus shadow */
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  transition: opacity 0.2s;
}

.forgot-password:hover {
  opacity: 0.8;
}

.submit-button {
  width: 100%;
  padding: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 4px var(--shadow-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button.primary {
  background-color: var(--primary-color);
}

.submit-button.primary:hover {
  background-color: darken(var(--primary-color), 10%); /* Funktion zum Abdunkeln definieren oder Farbe direkt ändern */
}

.signup-link {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.signup-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}
</style>
