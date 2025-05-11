<template>
  <div class="task-list-container">
    <h1 class="task-list-title">Your Tasks</h1>

    <!-- Neue Aufgabe hinzufügen -->
    <form @submit="handleAddTask" class="task-form">
      <input type="text" placeholder="Task title" v-model="title" class="task-input" required />
      <div class="task-form-options">
        <input type="date" v-model="dueDate" class="task-date-input" required />
        <select v-model="priority" class="task-priority-select">
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button type="submit" class="add-task-btn">Add Task</button>
      </div>
    </form>

    <!-- Aufgabenüberschrift mit Toggle -->
    <div class="task-header" @click="toggleTasks">
      <div class="toggle-icon">
        <ChevronDown v-if="tasksVisible" class="icon" />
        <ChevronUp v-if="!tasksVisible" class="icon" />
      </div>
      <h2 class="task-header-title">All Tasks</h2>
    </div>

    <!-- Aufgabenliste -->
    <div v-if="tasksVisible" class="task-list">
      <div v-if="sortedTasks.length > 0">
        <TaskItem
          v-for="task in sortedTasks"
          :key="task.id"
          :task="task"
          @complete="completeTask"
          @delete="deleteTask"
        />
      </div>
      <div v-else class="no-tasks-message">
        <p>You have no tasks yet. Add one to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/stores/TaskStore.ts' // Passe den Pfad an, falls nötig

const taskStore = useTaskStore()

const title = ref('')
const priority = ref(2)
const dueDate = ref('')
const tasksVisible = ref(true)

const sortedTasks = computed(() => {
  return [...taskStore.tasks].sort((a, b) => a.priority - b.priority)
})

function toggleTasks() {
  tasksVisible.value = !tasksVisible.value
}

function handleAddTask(event: Event) {
  event.preventDefault()
  if (!title.value.trim() || !dueDate.value) return

  taskStore.addTask({
    title: title.value.trim(),
    priority: priority.value,
    dueDate: new Date(dueDate.value), // ✅ convert string to Date
  })

  title.value = ''
  priority.value = 2
  dueDate.value = ''
}

function completeTask(taskId: string) {
  taskStore.completeTask(taskId)
}

function deleteTask(taskId: string) {
  taskStore.deleteTask(taskId)
}
</script>

<style scoped>
.task-list-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.task-list-title {
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1f2937;
}

.task-form {
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.task-input,
.task-date-input,
.task-priority-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.task-form-options {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.add-task-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-task-btn:hover {
  background-color: #1d4ed8;
}

.task-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
}

.toggle-icon {
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4b5563;
}

.task-header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.task-list {
  animation: fadeIn 0.3s ease-in-out forwards;
}

.no-tasks-message {
  text-align: center;
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.no-tasks-message p {
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
