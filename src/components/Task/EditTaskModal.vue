<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="text-xl font-bold mb-4">Aufgabe bearbeiten</h2>

      <form @submit.prevent="handleSave" class="space-y-4">
        <input v-model="user" type="text" placeholder="Benutzer (optional)" class="input" />
        <input v-model="title" type="text" placeholder="Titel" class="input" required />
        <textarea v-model="description" placeholder="Beschreibung" class="input" />

        <input v-model="dueDate" type="date" class="input" />

        <select v-model="priority" class="input">
          <option :value="1">Hoch</option>
          <option :value="2">Mittel</option>
          <option :value="3">Niedrig</option>
          <option :value="4">Keine</option>
        </select>

        <select v-model="recurring" class="input">
          <option value="">Einmalig</option>
          <option value="daily">Täglich</option>
          <option value="weekly">Wöchentlich</option>
        </select>

        <select v-model="status" class="input">
          <option value="open">Offen</option>
          <option value="in progress">In Bearbeitung</option>
          <option value="done">Erledigt</option>
        </select>

        <div class="flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Speichern</button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Abbrechen</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/stores/TaskStore'
import { updateTask } from '@/services/TaskApi'
import { useTaskStore } from '@/stores/TaskStore'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits(['close'])
const store = useTaskStore()

const title = ref(props.task.title)
const description = ref(props.task.description ?? '')
const dueDate = ref(props.task.dueDate ? new Date(props.task.dueDate).toISOString().split('T')[0] : '') // 💡 String für input[type="date"]
const priority = ref(props.task.priority)
const recurring = ref(props.task.recurring ?? '')
const status = ref(props.task.status ?? '')
const user = ref(props.task.user ?? '')


const handleSave = async () => {
  const updatedTask: Task = {
    ...props.task,
    title: title.value,
    description: description.value,
    dueDate: dueDate.value || null,
    priority: priority.value,
    recurring: recurring.value,
    status: status.value,
    user: user.value, // ✅ HIER gehört es hin!
  }

  try {
    const saved = await updateTask(updatedTask)
    const index = store.tasks.findIndex(t => t.id === saved.id)
    if (index !== -1) {
      store.tasks[index] = saved
    }
    emit('close')
  } catch (error) {
    console.error('Fehler beim Speichern:', error)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #111827;
}
</style>
