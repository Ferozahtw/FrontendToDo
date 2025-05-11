<template>
  <div class="upcoming-container">
    <div class="header">
      <h1 class="title">Upcoming</h1>
      <div class="month">{{ currentMonthYear }}</div>
    </div>

    <div class="section-header" @click="toggleTasks">
      <div class="icon-wrapper">
        <ChevronDown v-if="tasksVisible" class="icon" />
        <ChevronUp v-else class="icon" />
      </div>
      <h2 class="section-title">Future Tasks</h2>
    </div>

    <div v-if="tasksVisible" class="task-list">
      <div v-if="upcomingTasks.length > 0">
        <TaskItem
          v-for="task in upcomingTasks"
          :key="task.id"
          :task="task"
          @complete="completeTask"
          @delete="deleteTask"
        />
      </div>
      <div v-else class="empty-message">
        <p>No upcoming tasks. Your schedule is clear!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/stores/TaskStore.ts'

// Importiere den Task Store
const taskStore = useTaskStore()
const tasksVisible = ref(true)

const today = new Date()
today.setHours(0, 0, 0, 0)

// Berechnung für Monat und Jahr
const currentMonthYear = computed(() =>
  today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  }),
)

// Computed Property für zukünftige Aufgaben
const upcomingTasks = computed(() => {
  return taskStore.tasks
    .filter((task) => {
      const due = task.dueDate

      // Überprüfe, ob dueDate ein gültiges Date-Objekt ist
      if (!due || !(due instanceof Date) || isNaN(due.getTime())) return false

      due.setHours(0, 0, 0, 0) // Setze Zeit auf Mitternacht
      return due > today // Vergleiche mit dem heutigen Datum
    })
    .sort((a, b) => {
      const dateA = a.dueDate ? a.dueDate.getTime() : 0 // Überprüfen, ob dueDate definiert ist
      const dateB = b.dueDate ? b.dueDate.getTime() : 0 // Überprüfen, ob dueDate definiert ist
      return dateA !== dateB ? dateA - dateB : a.priority - b.priority
    })
})

// Toggle für Aufgabenanzeige
function toggleTasks() {
  tasksVisible.value = !tasksVisible.value
}

// Task als erledigt markieren
function completeTask(id: string) {
  taskStore.completeTask(id)
}

// Task löschen
function deleteTask(id: string) {
  taskStore.deleteTask(id)
}
</script>

<style scoped>
.upcoming-container {
  max-width: 48rem;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
}

.month {
  color: #6b7280;
}

.section-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
}

.icon-wrapper {
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4b5563;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.task-list {
  animation: fadeIn 0.3s ease-in-out forwards;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-message {
  text-align: center;
  padding: 2rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.empty-message p {
  color: #6b7280;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
