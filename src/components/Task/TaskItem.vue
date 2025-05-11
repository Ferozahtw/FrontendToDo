<template>
  <div class="task-item">
    <div class="priority-circle" :style="priorityCircleStyle">
      <div
        class="priority-circle-inner"
        :class="{ 'bg-green-500': isCompleted }"
        @click="handleComplete"
      >
        <svg
          v-if="isCompleted"
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
      <p :class="{ 'completed-task': isCompleted, 'task-title': !isCompleted }">
        {{ task.title }}
      </p>
      <p v-if="task.dueDate" class="due-date">
        Due: {{ new Date(task.dueDate).toLocaleDateString() }}
      </p>
    </div>

    <button @click="confirmDelete" class="delete-icon" aria-label="Delete task">
      <Trash2 class="w-5 h-5" />
    </button>

    <div v-if="isConfirmingDelete" class="delete-actions">
      <button @click="cancelDelete" class="cancel-delete-btn">Cancel</button>
      <button @click="handleDelete" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  onComplete: {
    type: Function,
    default: null,
  },
  onDelete: {
    type: Function,
    required: true,
  },
})

const isConfirmingDelete = ref(false)

const handleComplete = () => {
  if (!props.isCompleted && props.onComplete) {
    props.onComplete(props.task.id)
  }
}

const confirmDelete = () => {
  isConfirmingDelete.value = true
}

const cancelDelete = () => {
  isConfirmingDelete.value = false
}

const handleDelete = () => {
  props.onDelete(props.task.id)
}

const priorityCircleStyle = computed(() => {
  switch (props.task.priority) {
    case 1: return { backgroundColor: '#f44336' } // Rot
    case 2: return { backgroundColor: '#ff9800' } // Orange
    case 3: return { backgroundColor: '#4caf50' } // Grün (etwas anders als Gelb, ähnelt dem Foto)
    case 4: return { backgroundColor: '#9e9e9e' } // Grau
    default: return { backgroundColor: '#e0e0e0' } // Hellgrau
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
}

.priority-circle-inner.bg-green-500 {
  background-color: #4caf50; /* Grün für erledigte Aufgaben */
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

.due-date {
  color: #6b7280;
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

.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.text-white { color: #fff; }
.fill-none { fill: none; }
.viewBox { /* Du kannst das ViewBox-Attribut direkt im SVG lassen */ }
.stroke-currentColor { stroke: currentColor; }
.stroke-linecap-round { stroke-linecap: round; }
.stroke-linejoin-round { stroke-linejoin: round; }
.stroke-width-2 { stroke-width: 2; }
.d-path { /* Du kannst das d-Attribut direkt im SVG lassen */ }
</style>
