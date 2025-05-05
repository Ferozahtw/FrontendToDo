<template>
  <div v-if="visible" class="overlay">
    <div class="popup">
      <h2>Neue Aufgabe</h2>

      <input
        v-model="newTodo"
        type="text"
        placeholder="Was möchtest du erledigen?"
        class="input"
      />

      <div class="row">
        <label>Fälligkeitsdatum:</label>
        <input
          v-model="newDueDate"
          type="date"
          class="input"
        />
      </div>

      <div class="row">
        <label>Priorität:</label>
        <select v-model="newPriority" class="input">
          <option disabled value="">Wähle Priorität</option>
          <option value="1">🔴 Hoch (1)</option>
          <option value="2">🟡 Mittel (2)</option>
          <option value="3">🟢 Niedrig (3)</option>
          <option value="4">⚪ Sehr niedrig (4)</option>
        </select>
      </div>

      <div class="row">
        <label>Reminder:</label>
        <select v-model="reminder" class="input">
          <option disabled value="">Reminder auswählen</option>
          <option value="one-day-before">1 Tag vorher</option>
          <option value="same-day">Am gleichen Tag</option>
          <option value="daily-until-done">Täglich bis erledigt</option>
          <option value="none">Kein Reminder</option>
        </select>
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="close">Abbrechen</button>
        <button class="add-btn" @click="addTodo">Aufgabe hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const newTodo = ref('')
const newPriority = ref('')
const newDueDate = ref('')
const reminder = ref('')

const emit = defineEmits<{
  (e: 'add-todo', task: {
    id: number;
    text: string;
    done: boolean;
    priority: string;
    dueDate: string;
    reminder: string;
  }): void;
}>()

function open() {
  visible.value = true
}

function close() {
  visible.value = false
  newTodo.value = ''
  newPriority.value = ''
  newDueDate.value = ''
  reminder.value = ''
}

function addTodo() {
  if (newTodo.value.trim()) {
    emit('add-todo', {
      id: Date.now(),
      text: newTodo.value,
      done: false,
      priority: newPriority.value,
      dueDate: newDueDate.value,
      reminder: reminder.value,
    })
    close()
  }
}

defineExpose({ open })
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
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

.row {
  margin-bottom: 12px;
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

