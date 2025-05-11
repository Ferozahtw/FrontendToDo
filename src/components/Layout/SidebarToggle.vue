<template>
  <button
    @click="$emit('toggleSidebar')"
    :class="['toggle-button', { open: isOpen }]"
    aria-label="Toggle Sidebar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="menu-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['toggleSidebar'])
</script>

<style scoped>
.toggle-button {
  position: fixed;
  top: 1.25rem;
  left: 1.25rem;
  z-index: 50;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.toggle-button:hover {
  background-color: #f3f4f6;
}

.toggle-button:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
}

.toggle-button.open {
  left: 14rem;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #4b5563;
}

:global(.dark) .toggle-button {
  background-color: #1f2937;
}

:global(.dark) .toggle-button:hover {
  background-color: #374151;
}

:global(.dark) .menu-icon {
  color: #d1d5db;
}
</style>
