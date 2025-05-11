<template>
  <aside :class="['sidebar', { open: isOpen }]">
    <div class="sidebar-content">
      <!-- Header -->
      <div class="header">
        <CheckSquare class="logo-icon" />
        <span class="logo-text">TaskMaster</span>
      </div>

      <!-- Navigation -->
      <nav class="nav-menu">
        <NavItem to="/" :icon="List" label="Tasks" />
        <button @click="openAddTaskOverlay" class="nav-button">
          <PlusCircle class="nav-icon" />
          <span class="nav-label">Add Task</span>
        </button>
        <NavItem to="/todays-tasks" :icon="Calendar" label="Today" />
        <NavItem to="/upcoming-tasks" :icon="Clock" label="Upcoming" />
        <NavItem to="/completed-tasks" :icon="CheckCircle" label="Completed" />
        <button @click="openSearchOverlay" class="nav-button">
          <Search class="nav-icon" />
          <span class="nav-label">Search</span>
        </button>
      </nav>

      <!-- Settings and Profile -->
      <div class="footer-menu">
        <NavItem to="/settings" :icon="Settings" label="Settings" />
        <NavItem to="/profile" :icon="User" label="Profile" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import {
  CheckCircle,
  Calendar,
  Clock,
  List,
  PlusCircle,
  Search,
  Settings,
  User,
  CheckSquare,
} from 'lucide-vue-next'

// Importiere den Typ FunctionalComponent
import type { FunctionalComponent } from 'vue'

// Definiere die Props direkt im defineProps
defineProps<{
  isOpen: boolean
  openAddTaskOverlay: () => void
  openSearchOverlay: () => void
}>()

// Definiere das Interface für NavItemProps
interface NavItemProps {
  to: string
  icon: FunctionalComponent // Verwende FunctionalComponent als Typ
  label: string
}

// NavItem Komponente
const NavItem = (props: NavItemProps) => {
  return h(
    RouterLink,
    {
      to: props.to,
      class: 'nav-link',
    },
    {
      default: () =>
        h('div', { class: 'nav-item-content' }, [
          h(props.icon, { class: 'nav-icon' }),
          h('span', { class: 'nav-label' }, props.label),
        ]),
    }
  )
}

</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  height: 100vh;
  width: 16rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; /* NEU: Scroll falls nötig */
}


.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #2563eb;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link,
.nav-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link:hover,
.nav-button:hover {
  background-color: #f3f4f6;
}

.nav-item-content {
  display: flex;
  align-items: center;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.nav-label {
  font-weight: 500;
  line-height: 1.25rem;
}

.footer-menu {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: auto; /* schiebt Footer nach unten */
  padding-bottom: 1rem; /* NEU: zusätzlicher Puffer unten */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


:global(.dark) .sidebar {
  background-color: #1f2937;
}

:global(.dark) .logo-text {
  color: #f9fafb;
}

:global(.dark) .nav-link,
:global(.dark) .nav-button {
  color: #d1d5db;
}

:global(.dark) .nav-link:hover,
:global(.dark) .nav-button:hover {
  background-color: #374151;
}

:global(.dark) .footer-menu {
  border-color: #374151;
}
</style>
