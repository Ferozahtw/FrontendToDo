<template>
  <div class="task-item">
    <div class="priority-circle" :style="priorityCircleStyle">
      <div
        class="priority-circle-inner"
        @click="handleComplete"
      >
        <svg
          v-if="task.completed"
          class="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <div class="task-content">
      <p v-if="task.user" class="user">Benutzer: {{ task.user }}</p>
      <p :class="{ 'completed-task': task.completed, 'task-title': !task.completed }">
      {{ task.title }}
      </p>
      <p v-if="task.description" class="description">{{ task.description }}</p>
      <p v-if="task.dueDate" class="due-date">
        Due: {{ new Date(task.dueDate).toLocaleDateString() }}
      </p>
      <p v-if="task.recurring" class="recurring">
        Repeats: {{ task.recurring }}
      </p>
      <p v-if="task.status" class="status">
        Status: {{ task.status }}
      </p>
      <div v-if="task.attachments?.length" class="attachments">
        <p>Attachments:</p>
        <ul>
          <li v-for="(file, index) in task.attachments" :key="index">
            <a :href="file" target="_blank">{{ file }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center ml-4">
      <button @click="startEdit" class="text-blue-500 hover:text-blue-700 mr-2" aria-label="Edit task">✏️</button>
      <button @click="confirmDelete" class="delete-icon" aria-label="Delete task">
        <Trash2 class="w-5 h-5" />
      </button>
    </div>

    <div v-if="isConfirmingDelete" class="delete-actions">
      <button @click="cancelDelete" class="cancel-delete-btn">Cancel</button>
      <button @click="handleDelete" class="delete-btn">Delete</button>
    </div>

    <!-- Edit Modal -->
    <EditTaskModal v-if="isEditing" :task="task" @close="isEditing = false" />
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import EditTaskModal from '@/components/Task/EditTaskModal.vue'
import type { Task } from '@/stores/TaskStore'

const props = defineProps<{
  task: Task
  onComplete?: (id: number) => void
  onDelete: (id: number) => void
}>()

const isConfirmingDelete = ref(false)
const isEditing = ref(false)

const confirmDelete = () => {
  isConfirmingDelete.value = true
}
const cancelDelete = () => {
  isConfirmingDelete.value = false
}
const handleDelete = () => {
  props.onDelete(props.task.id)
}
const startEdit = () => {
  isEditing.value = true
}

const handleComplete = () => {
  if (!props.task.completed && props.onComplete) {
    props.onComplete(props.task.id)
  }
}

const priorityCircleStyle = computed(() => {
  if (props.task.completed) {
    return { backgroundColor: '#4caf50' } // Grün
  }

  switch (props.task.priority) {
    case 1: return { backgroundColor: '#f44336' }
    case 2: return { backgroundColor: '#ff9800' }
    case 3: return { backgroundColor: '#4caf50' }
    case 4: return { backgroundColor: '#9e9e9e' }
    default: return { backgroundColor: '#e0e0e0' }
  }
})

</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}
.task-item:hover {
  transform: translateY(-2px);
}
.priority-circle {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}
.priority-circle-inner {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.priority-circle-inner.bg-green-500 {
  background-color: #4caf50;
}

.priority-circle:hover {
  filter: brightness(1.1);
}

.task-content {
  flex-grow: 1;
}
.task-title {
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
  margin-bottom: 0.25rem;
}
.completed-task {
  text-decoration: line-through;
  color: #6b7280;
}
.due-date, .description, .recurring, .status {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
.attachments {
  margin-top: 0.5rem;
}
.attachments a {
  color: #3b82f6;
  text-decoration: underline;
  font-size: 0.875rem;
}
.delete-icon {
  color: #9ca3af;
  margin-left: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}
.delete-icon:hover {
  color: #ef4444;
}
.delete-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}
.cancel-delete-btn,
.delete-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
.cancel-delete-btn {
  background-color: #e5e7eb;
  color: #1f2937;
}
.delete-btn {
  background-color: #f87171;
  color: white;
}
.delete-btn:hover {
  background-color: #ef4444;
}

.user {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

</style>
