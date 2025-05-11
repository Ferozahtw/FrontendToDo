<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center p-6 pt-20 overflow-y-auto"
    @click="$emit('close')"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-fadeIn"
      @click.stop
    >
      <!-- Search Bar -->
      <div class="p-4 border-b border-gray-200 flex items-center">
        <Search class="w-5 h-5 text-gray-500 mr-3" />
        <input
          ref="inputRef"
          type="text"
          v-model="searchQuery"
          placeholder="Search or type a command..."
          class="flex-grow bg-transparent border-none outline-none text-black"
        />
        <button @click="$emit('close')" class="text-gray-500 hover:text-black transition-colors ml-2">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Sections -->
      <div class="divide-y divide-gray-200">
        <SearchSection title="Recently Viewed">
          <SearchItem icon="List" label="Task" :onClick="() => navigateTo('/task/1')" />
          <SearchItem icon="Calendar" label="Today’s Tasks" :onClick="() => navigateTo('/todays-tasks')" />
          <SearchItem icon="CheckCircle" label="Completed" :onClick="() => navigateTo('/completed/ux-review')" />
        </SearchSection>

        <!-- Navigation -->
        <SearchSection title="Navigation">
          <SearchItem icon="List" label="Go to Tasks" :onClick="() => navigateTo('/')" />
          <SearchItem icon="Calendar" label="Go to Today" :onClick="() => navigateTo('/todays-tasks')" />
          <SearchItem icon="Clock" label="Go to Upcoming" :onClick="() => navigateTo('/upcoming-tasks')" />
          <SearchItem icon="CheckCircle" label="Go to Completed" :onClick="() => navigateTo('/completed-tasks')" />
        </SearchSection>

        <!-- Add -->
        <SearchSection title="Add">
          <SearchItem icon="PlusCircle" label="Add Task" :onClick="openAddTask" />
        </SearchSection>

        <!-- Templates -->
        <SearchSection title="Templates">
          <SearchItem icon="User" label="Open User Menu" :onClick="toggleUserMenu" />
          <SearchItem icon="Bell" label="Open Notifications" :onClick="showNotificationAlert" />

          <div v-if="showUserMenu" class="ml-9 mt-2 bg-gray-100 p-3 rounded-md">
            <p><strong>Username:</strong> Demo User</p>
            <p class="text-sm text-gray-600 mb-2">Tasks: 27</p>
            <div class="space-y-1 mt-2">
              <SubItem icon="Settings" label="Settings" :onClick="() => navigateTo('/settings')" />
              <SubItem icon="Printer" label="Print" :onClick="showPrintAlert" />
              <SubItem icon="User" label="Profile" :onClick="() => navigateTo('/profile')" />
            </div>
          </div>
        </SearchSection>

        <!-- Help -->
        <SearchSection title="Help">
          <SearchItem icon="Keyboard" label="Show Keyboard Shortcuts" :onClick="toggleShortcuts" />
          <div v-if="showShortcuts" class="ml-9 mt-2 bg-gray-100 p-3 rounded-md font-mono text-sm whitespace-pre leading-relaxed">
            General:
            <br />
            <strong>Enter</strong> - Open task view <br />
            <strong>X</strong> - Select task <br />
            <strong>↑ ↓</strong> - Move up/down <br />
            <strong>Q</strong> - Quick Add <br />
            <strong>M</strong> - Open/Close Sidebar
          </div>
        </SearchSection>

        <!-- Miscellaneous -->
        <SearchSection title="Miscellaneous">
          <SearchItem icon="Printer" label="Print Current View" :onClick="showPrintAlert" />
          <SearchItem icon="Columns" label="Open/Close Sidebar" :onClick="toggleSidebar" />
        </SearchSection>

        <!-- Settings -->
        <SearchSection title="Settings">
          <SearchItem icon="Settings" label="Settings" :onClick="() => navigateTo('/settings')" />
          <SearchItem icon="Bell" label="Notifications" :onClick="showNotificationAlert" />
        </SearchSection>

        <!-- Account -->
        <SearchSection title="Account">
          <SearchItem icon="User" label="Profile" :onClick="() => navigateTo('/profile')" />
        </SearchSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps, h } from 'vue'
import { useRouter } from 'vue-router'
import {
  X,
  Search,
  Calendar,
  List,
  CheckCircle,
  PlusCircle,
  User,
  Bell,
  Keyboard,
  Printer,
  Columns,
  Settings,
  Clock,
} from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'

defineProps<{ onClose: () => void }>()
const emit = defineEmits(['close'])

const searchQuery = ref('')
const showUserMenu = ref(false)
const showShortcuts = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const router = useRouter()

onMounted(() => {
  inputRef.value?.focus()
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
})

const toggleUserMenu = () => (showUserMenu.value = !showUserMenu.value)
const toggleShortcuts = () => (showShortcuts.value = !showShortcuts.value)
const navigateTo = (path: string) => {
  router.push(path)
  emit('close')
}
const openAddTask = () => {
  emit('close')
  document.dispatchEvent(new CustomEvent('openAddTask'))
}
const showPrintAlert = () => alert('Print functionality will be available soon')
const showNotificationAlert = () => alert('Notification panel will be available soon')
const toggleSidebar = () => {
  emit('close')
  document.dispatchEvent(new CustomEvent('toggleSidebar'))
}

// UI components
interface SearchSectionProps {
  title: string
}
const SearchSection: FunctionalComponent<SearchSectionProps> = (props, { slots }) => {
  return h(
    'div',
    { class: 'py-3 px-4' },
    [
      h('h4', { class: 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2' }, props.title),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } }, slots.default?.()), // Flexbox mit gap
    ]
  )
}

interface SearchItemProps {
  icon: string
  label: string
  onClick?: () => void
}
const SearchItem: FunctionalComponent<SearchItemProps> = (props) => {
  const icons = { Calendar, List, CheckCircle, PlusCircle, User, Bell, Keyboard, Printer, Columns, Settings, Clock }
  const Icon = icons[props.icon as keyof typeof icons]
  return h(
    'div',
    {
      class: 'flex items-center px-3 py-2 text-black hover:bg-gray-100 rounded-md cursor-pointer transition-colors',
      onClick: props.onClick,
    },
    [
      Icon && h(Icon, { class: 'w-5 h-5 text-gray-600', style: { marginRight: '1rem' } }), // Direkter Style
      h('span', { class: 'text-sm' }, props.label),
    ]
  )
}

interface SubItemProps {
  icon: string
  label: string
  onClick?: () => void
}
const SubItem: FunctionalComponent<SubItemProps> = (props) => {
  const icons = { Settings, Printer, User }
  const Icon = icons[props.icon as keyof typeof icons]
  return h(
    'div',
    {
      class: 'flex items-center px-2 py-1 rounded-md cursor-pointer text-sm text-black hover:bg-gray-200 transition-colors',
      onClick: props.onClick,
    },
    [
      Icon && h(Icon, { class: 'w-4 h-4 text-gray-600', style: { marginRight: '0.75rem' } }), // Direkter Style
      h('span', props.label),
    ]
  )
}
</script>

<style scoped>

/* New and improved fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out forwards;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  padding-top: 5rem;
  overflow-y: auto;
}

.bg-white {
  background-color: white;
}

.dark\:bg-gray-800 {
  background-color: #2d3748;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-xl {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.w-full {
  width: 100%;
}

.max-w-2xl {
  max-width: 48rem; /* Beibehale die maximale Breite */
}

.max-h-\[80vh\] {
  max-height: 80vh;
}

.overflow-y-auto {
  overflow-y: auto;
}

.animate-slideDown {
  animation: slideDown 0.3s ease forwards;
}

.p-4 {
  padding: 1rem;
}

.border-b {
  border-bottom-width: 1px;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.dark\:border-gray-700 {
  border-color: #4a5568;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.text-gray-400 {
  color: #a0aec0;
}

.dark\:text-gray-500 {
  color: #718096;
}

.mr-2 {
  margin-right: 0.5rem;
}

.flex-grow {
  flex-grow: 1;
}

.bg-transparent {
  background-color: transparent;
}

.border-none {
  border-style: none;
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.text-gray-800 {
  color: #2d3748;
}

.dark\:text-gray-200 {
  color: #edf2f7;
}

.text-gray-500 {
  color: #718096;
}

.hover\:text-gray-700:hover {
  color: #4a5568;
}

.dark\:hover\:text-gray-300:hover {
  color: #d1d5db;
}

.transition-colors {
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.ml-2 {
  margin-left: 0.5rem;
}

.divide-y > :not([hidden]) ~ :not([hidden]) {
  border-top-width: 1px;
  border-color: #edf2f7;
}

.dark\:divide-gray-700 > :not([hidden]) ~ :not([hidden]) {
  border-color: #4a5568;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.text-xs {
  font-size: 0.75rem;
}

.font-semibold {
  font-weight: 600;
}

.uppercase {
  text-transform: uppercase;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0.25rem;
}

.text-sm {
  font-size: 0.875rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.dark\:hover\:bg-gray-700:hover {
  background-color: #4a5568;
}

.cursor-pointer {
  cursor: pointer;
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.ml-9 {
  margin-left: 2.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.p-3 {
  padding: 0.75rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.whitespace-pre {
  white-space: pre;
}

.leading-relaxed {
  line-height: 1.625;
}
</style>
