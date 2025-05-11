<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Completed Tasks</h1>

    <div class="task-header" @click="toggleTasks">
      <div class="toggle-icon">
        <ChevronDown v-if="tasksVisible" class="icon" />
        <ChevronUp v-else class="icon" />
      </div>
      <h2 class="task-header-title">Completed</h2>
    </div>

    <div v-if="tasksVisible" class="space-y-3 animate-fadeIn">
      <div v-if="sortedCompletedTasks.length > 0">
        <TaskItem
          v-for="task in sortedCompletedTasks"
          :key="task.id"
          :task="task"
          :isCompleted="true"
          @delete="deleteTask(task.id)"
        />
      </div>
      <div v-else class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-gray-500">No completed tasks yet. Keep going!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import TaskItem from './TaskItem.vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next' // ✅ Importiere die Icons

interface Task {
  id: string | number
  completedAt: string
}

const props = defineProps({
  completedTasks: {
    type: Array as () => Task[],
    required: true,
  },
  deleteTask: {
    type: Function,
    required: true,
  },
})

const tasksVisible = ref(true)

const toggleTasks = () => {
  tasksVisible.value = !tasksVisible.value
}

const sortedCompletedTasks = computed(() => {
  return [...props.completedTasks].sort((a, b) => {
    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  })
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
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

.task-header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}
</style>
