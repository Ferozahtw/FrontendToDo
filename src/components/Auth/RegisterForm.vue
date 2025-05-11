<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">Create Account</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input v-model="email" type="email" id="email" required class="input" />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" required class="input" />
        </div>

        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            v-model="confirmPassword"
            id="confirm-password"
            type="password"
            required
            class="input"
            :class="{ 'input-error': !passwordsMatch }"
          />
          <p v-if="!passwordsMatch" class="error-message">Passwords do not match</p>
        </div>

        <button type="submit" :disabled="!passwordsMatch" class="submit-button primary" :class="{ 'button-disabled': !passwordsMatch }">
          Sign Up
        </button>
      </form>

      <p class="login-link">
        Already have an account?
        <router-link to="/login" class="link">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore.ts';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const { register } = useAuthStore();

const passwordsMatch = computed(() => password.value === confirmPassword.value || confirmPassword.value === '');

const handleSubmit = async () => {
  if (!passwordsMatch.value) return;

  try {
    await register(email.value, password.value);
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
}

.register-box {
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
  margin-bottom: 2rem;
  color: var(--text-primary);
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
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  width: 100%;
  padding: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.submit-button:hover {
  opacity: 0.9;
}

.button-disabled {
  background-color: var(--secondary-color);
  cursor: not-allowed;
  opacity: 0.7;
}

.button-disabled:hover {
  opacity: 0.7;
}

.login-link {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-link .link {
  color: var(--primary-color);
  font-weight: 600;
  transition: opacity 0.2s;
}

.login-link .link:hover {
  opacity: 0.8;
}
</style>
