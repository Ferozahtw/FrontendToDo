<template>
  <div :class="isDarkMode ? 'dark' : 'light'">
    <router-view /> <!-- Dies ist der Platz, an dem die Routen angezeigt werden -->
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { useAuthStore } from './stores/AuthStore'
import { useTaskStore } from './stores/TaskStore'

// Theme toggling
const isDarkMode = ref(false)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // Speichern des Themas im localStorage
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

// Theme beim Laden aus localStorage setzen
if (localStorage.getItem('theme') === 'dark') {
  isDarkMode.value = true
}

// Provide Auth and Task stores globally
const auth = useAuthStore()
const tasks = useTaskStore()

provide('auth', auth)
provide('tasks', tasks)
</script>

<style>
/* Theme styles */
body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.light {
  background-color: #f9fafb;
  color: #111827;
}

.dark {
  background-color: #111827;
  color: #f9fafb;
}

/* Weitere Styles für Animationen */
</style>
