<template>
  <div class="todays-tasks-container">
    <h1 class="todays-tasks-title">Today's Tasks</h1>

    <!-- Toggle Button -->
    <div class="task-header" @click="toggleTasks">
      <div class="toggle-icon">
        <ChevronDown v-if="tasksVisible" class="icon" />
        <ChevronUp v-else class="icon" />
      </div>
      <h2 class="task-header-title">Due Today</h2>
    </div>

    <!-- Task List -->
    <div v-if="tasksVisible" class="task-list">
      <div v-if="todayTasks.length > 0">
        <TaskItem
          v-for="task in todayTasks"
          :key="task.id"
          :task="task"
          @complete="completeTask"
          @delete="deleteTask"
        />
      </div>
      <div v-else class="no-tasks-message">
        <p>No tasks due today. Enjoy your day!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next' // ✅ richtiger Import
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/stores/TaskStore.ts' // ✅ dein Pinia Store

const taskStore = useTaskStore()
const tasksVisible = ref(true)

const todayDate = new Date().toISOString().split('T')[0]

const todayTasks = computed(() =>
  taskStore.tasks
    .filter((task) => {
      if (!task.dueDate) return false
      return new Date(task.dueDate).toISOString().split('T')[0] === todayDate
    })
    .sort((a, b) => a.priority - b.priority),
)

function toggleTasks() {
  tasksVisible.value = !tasksVisible.value
}

function completeTask(taskId: string) {
  taskStore.completeTask(taskId)
}

function deleteTask(taskId: string) {
  taskStore.deleteTask(taskId)
}
</script>

<style scoped>
.todays-tasks-container {
  max-width: 48rem;
  margin: 0 auto;
}

.todays-tasks-title {
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1f2937;
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
