<template>
  <div class="app-layout">
    <button @click="toggleSidebar" :class="['sidebar-toggle', { 'shifted': isSidebarOpen }]">
      ☰
    </button>

    <aside :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <img alt="ToDo Logo" class="logo" src="@/assets/todo-logo.png" width="80" />
      <nav>
        <RouterLink to="/" class="nav-link"><i class="fas fa-list"></i> ToDos</RouterLink>
        <button class="nav-link" @click="openAddTaskOverlay">
          <i class="fas fa-plus-circle"></i> AddTask
        </button>
        <RouterLink to="/todays-tasks" class="nav-link"><i class="fas fa-calendar-day"></i> Heute</RouterLink>
        <RouterLink to="/upcoming-tasks" class="nav-link"><i class="fas fa-hourglass-half"></i> Bald</RouterLink>
        <RouterLink to="/completed-tasks" class="nav-link"><i class="fas fa-check-circle"></i> Erledigt</RouterLink>
        <button class="nav-link" @click="openSearchOverlay">
          <i class="fas fa-search"></i> Suche
        </button>
        <RouterLink to="/settings" class="nav-link"><i class="fas fa-cogs"></i> Settings</RouterLink>
        <RouterLink to="/profile" class="nav-link"><i class="fas fa-user"></i> Profil</RouterLink>
      </nav>
    </aside>

    <main>
      <RouterView />
    </main>

    <AddTaskOverlay ref="addTaskOverlayRef" />
    <SearchOverlay ref="searchOverlayRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddTaskOverlay from './components/AddTaskOverlay.vue'
import SearchOverlay from './components/SearchOverlay.vue'
import { RouterLink, RouterView } from 'vue-router'

const isSidebarOpen = ref(false)
const searchOverlayRef = ref<InstanceType<typeof SearchOverlay> | null>(null)
const addTaskOverlayRef = ref<InstanceType<typeof AddTaskOverlay> | null>(null)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function openSearchOverlay() {
  searchOverlayRef.value?.open()
}

function openAddTaskOverlay() {
  addTaskOverlayRef.value?.open()
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  background-color: white;
  border: none;
  font-size: 2rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 5px;
  transition: left 0.3s ease;
}

.sidebar-toggle.shifted {
  left: 240px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 99;
  overflow-y: auto;
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.nav-link.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 2rem;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

@media (min-width: 769px) {
  .sidebar-open + main {
    margin-left: 220px;
  }
}
</style>
