<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-scaleIn popup"
      @click.stop
    >
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-semibold text-gray-800">Add New Task</h2>
        <button
          @click="onClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-4">
        <div class="mb-4">
          <input
            type="text"
            placeholder="What do you want to do?"
            v-model="title"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input"
            autoFocus
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            v-model="dueDate"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            v-model="priority"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input"
          >
            <option value="">Select Priority</option>
            <option value="1">🔴 High (1)</option>
            <option value="2">🟡 Medium (2)</option>
            <option value="3">🟢 Low (3)</option>
            <option value="4">⚪ Very Low (4)</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
          <select
            v-model="reminder"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input"
          >
            <option value="">Select Reminder</option>
            <option value="one-day-before">1 Day Before</option>
            <option value="same-day">Same Day</option>
            <option value="daily-until-done">Daily Until Done</option>
            <option value="none">No Reminder</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 actions">
          <button
            type="button"
            @click="onClose"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors add-btn"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineEmits } from 'vue'

// Define the custom event
const emit = defineEmits<{
  (e: 'add-task', task: { title: string; dueDate: string; priority: number; reminder: string }): void
  (e: 'close'): void
}>()


// Local state
let title = ''
let dueDate = ''
let priority = ''
let reminder = ''

// Method to handle form submission
const handleSubmit = () => {
  if (title.trim()) {
    emit('add-task', {
      title,
      dueDate,
      priority: parseInt(priority, 10) || 4,
      reminder,
    })
    onClose()
  }
}

// Method to close the form overlay
const onClose = () => {
  emit('close'); // Korrekte Syntax für das Emittieren des 'close'-Events
  title = '';
  dueDate = '';
  priority = '';
  reminder = '';
};
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

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
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
  align-items: center;
  padding: 1.5rem; /* Optional */
  overflow-y: auto; /* Optional */
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease forwards;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.cancel-btn {
  background: #ddd;
  color: #333;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn {
  background-color: #42b983;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #369f6d;
}
</style>
