<template>
  <div class="upcoming">
    <!-- Header -->
    <div class="header">
      <h1>Upcoming</h1>
      <!-- Monat und Jahr anzeigen -->
      <span>{{ currentMonthYear }}</span>
    </div>

    <!-- Overdue Section -->
    <div class="overdue-container">
      <div class="overdue-title" @click="toggleTasks">
        <span class="arrow" :class="{ 'rotated': tasksVisible }">▼</span>
        <span class="overdue-text">Overdue</span>
      </div>

      <!-- Overdue Tasks (shown if tasksVisible is true) -->
      <div v-if="tasksVisible" class="tasks">
        <div v-for="task in sortedTasks" :key="task.name" class="task-item">
          <div :class="['priority-circle', getPriorityClass(task.priority), { completed: task.completed }]">
            <span v-if="task.completed">✔️</span>
          </div>
          <div class="task-details">
            <div class="task-name">{{ task.name }}</div>
          </div>
          <div class="delete-task" @click="confirmDelete(task)">🗑️</div>
        </div>
      </div>
    </div>

    <!-- Add Task Button -->
    <div class="add-task-button">
      <button @click="openAddTaskPopup" class="add-task-btn">+ Add Task</button>
    </div>

    <!-- Add Task Popup -->
    <div v-if="visible" class="overlay">
      <div class="popup">
        <h2>Neue Aufgabe</h2>
        <input v-model="newTask" type="text" placeholder="Was möchtest du erledigen?" class="input" />
        <div class="row">
          <label>Fälligkeitsdatum:</label>
          <input v-model="newDueDate" type="date" class="input" />
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
          <button class="cancel-btn" @click="closeAddTaskPopup">Abbrechen</button>
          <button class="add-btn" @click="addTask">Aufgabe hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Task {
  name: string;
  due: string;
  priority: number;
  completed: boolean;
  added: string;
  time?: string;
}

// Die Aufgabenliste
const tasks = ref<Task[]>([
  { name: 'do', due: 'Yesterday', priority: 1, completed: false, added: 'Dienstag, 29. April 2025, um 11:59 Uhr' },
  { name: 'aik', due: 'Yesterday', priority: 2, completed: false, added: 'Dienstag, 29. April 2025, um 12:30 Uhr' },
  { name: 'teen', due: 'Yesterday', priority: 3, completed: false, added: 'Dienstag, 29. April 2025, um 13:00 Uhr' },
  { name: 'Download Todoist on all your devices and email', due: 'Yesterday', priority: 1, completed: false, added: 'Dienstag, 29. April 2025, um 14:00 Uhr' },
  { name: 'char', due: 'Yesterday', priority: 4, completed: false, added: 'Dienstag, 29. April 2025, um 15:00 Uhr' },
]);

const visible = ref(false);
const newTask = ref('');
const newPriority = ref('');
const newDueDate = ref('');
const reminder = ref('');

// Anzeigen/Verstecken der Aufgaben
const tasksVisible = ref(true);

// Toggle für das Anzeigen der Aufgaben
const toggleTasks = () => {
  tasksVisible.value = !tasksVisible.value;
};

// Aufgaben nach Priorität sortieren
const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => a.priority - b.priority);
});

// Methode zum Bestimmen der CSS-Klasse für die Priorität
const getPriorityClass = (priority: number) => {
  switch (priority) {
    case 1: return 'priority-1';
    case 2: return 'priority-2';
    case 3: return 'priority-3';
    case 4: return 'priority-4';
    default: return '';
  }
};

// Aufgabe hinzufügen
const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({
      name: newTask.value,
      due: newDueDate.value,
      priority: parseInt(newPriority.value, 10),
      completed: false,
      added: new Date().toLocaleString(),
    });
    closeAddTaskPopup();
  }
};

// Popup öffnen
const openAddTaskPopup = () => visible.value = true;

// Popup schließen
const closeAddTaskPopup = () => {
  visible.value = false;
  newTask.value = '';
  newPriority.value = '';
  newDueDate.value = '';
  reminder.value = '';
};

// Bestätigung für das Löschen einer Aufgabe
const confirmDelete = (task: Task) => {
  if (confirm("Möchten Sie diesen Task wirklich löschen?")) {
    deleteTask(task);
  }
};

// Aufgabe löschen
const deleteTask = (task: Task) => {
  tasks.value = tasks.value.filter(t => t !== task);
};

// Aktuelles Monat und Jahr
const currentMonthYear = computed(() => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }; // Korrektur der Typen
  return date.toLocaleDateString('de-DE', options);
});
</script>

<style scoped>
.upcoming {
  margin: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 2rem;
}

.overdue-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
}

.arrow {
  margin-right: 10px;
  font-size: 1.0rem;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.tasks {
  margin-top: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
}

.priority-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.priority-circle.priority-1 {
  background-color: rgba(255, 76, 76, 0.6);
}

.priority-circle.priority-2 {
  background-color: rgba(255, 204, 0, 0.6);
}

.priority-circle.priority-3 {
  background-color: rgba(76, 175, 80, 0.6);
}

.priority-circle.priority-4 {
  background-color: rgba(211, 211, 211, 0.6);
}

.delete-task {
  cursor: pointer;
  font-size: 20px;
  color: red;
  margin-left: 15px;
}

.add-task-button {
  text-align: center;
  margin-top: 20px;
}

.add-task-btn {
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: #369f6d;
}

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
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: "Arial", sans-serif;
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
