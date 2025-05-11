<template>
  <div class="app-layout">
    <SidebarToggle :isOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />
    <AppSidebar
      :isOpen="isSidebarOpen"
      :openAddTaskOverlay="openAddTaskOverlay"
      :openSearchOverlay="openSearchOverlay" />

    <main :class="['main-content', { 'sidebar-open': isSidebarOpen }]">
      <div class="content-wrapper">
        <div class="theme-toggle">
          <button @click="toggleTheme" class="theme-button">
            {{ isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode' }}
          </button>
        </div>

        <router-view
          :completedTasks="completedTasks"
          :deleteTask="deleteTaskFromStore"
        />
      </div>
    </main>

    <AddTaskOverlay v-if="isAddTaskOpen" @close="closeAddTask" />
    <SearchOverlay v-if="isSearchOpen" @close="closeSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, type Ref, computed } from 'vue'
import AppSidebar from './AppSidebar.vue'
import SidebarToggle from './SidebarToggle.vue'
import AddTaskOverlay from '../Task/AddTaskOverlay.vue'
import SearchOverlay from '../Search/SearchOverlay.vue'
import { useTaskStore } from '@/stores/TaskStore'
import { storeToRefs } from 'pinia'

// Reactive States
const isSidebarOpen = ref(false)
const isAddTaskOpen = ref(false)
const isSearchOpen = ref(false)

// Inject theme toggling function from App.vue
const toggleTheme = inject('toggleTheme') as () => void
const isDarkMode = inject('isDarkMode') as Ref<boolean>

// Access the Task Store
const taskStore = useTaskStore()
const { completedTasks } = storeToRefs(taskStore)

// Method to delete a task from the store
const deleteTaskFromStore = (taskId: string) => {
  taskStore.deleteTask(taskId)
}

// Methods to open/close overlays
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const openAddTaskOverlay = () => { // Behalte diese Namen konsistent
  isAddTaskOpen.value = true
}

const closeAddTask = () => {
  isAddTaskOpen.value = false
}

const openSearchOverlay = () => { // Behalte diese Namen konsistent
  isSearchOpen.value = true
}

const closeSearch = () => {
  isSearchOpen.value = false
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  background-color: #f9fafb;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 0;
}

.main-content.sidebar-open {
  margin-left: 16rem;
}

.content-wrapper {
  padding: 1.5rem;
}

.theme-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.theme-button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.theme-button:hover {
  background-color: #1d4ed8;
}

:global(.dark) {
  background-color: #111827;
  color: #f9fafb;
}

:global(.dark) .app-layout {
  background-color: #111827;
}

:global(.dark) .theme-button {
  background-color: #374151;
}

:global(.dark) .theme-button:hover {
  background-color: #4b5563;
}
</style>
