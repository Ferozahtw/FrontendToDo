<template>
  <div v-if="visible" class="overlay">
    <div class="popup">
      <div class="header">
        <input type="text" v-model="searchQuery" placeholder="Search or type a command..." />
        <button @click="close">✖</button>
      </div>

      <div class="section">
        <h4>Recently viewed</h4>
        <ul>
          <li><i class="fas fa-calendar-day"></i> Today’s Tasks</li>
          <li><i class="fas fa-inbox"></i> Inbox</li>
          <li><i class="fas fa-check-circle"></i> Erledigt</li>
        </ul>
      </div>

      <div class="section">
        <h4>Navigation</h4>
        <ul>
          <li><i class="fas fa-home"></i> Go to Home</li>
          <li><i class="fas fa-inbox"></i> Go to Inbox</li>
          <li><i class="fas fa-calendar-day"></i> Go to Today</li>
          <li><i class="fas fa-hourglass-half"></i> Go to Upcoming</li>
          <li><i class="fas fa-check-circle"></i> Go to Completed</li>
        </ul>
      </div>

      <div class="section">
        <h4>Add</h4>
        <ul>
          <li><i class="fas fa-plus-circle"></i> Add Task</li>
        </ul>
      </div>

      <div class="section">
        <h4>Templates</h4>
        <ul>
          <li @click="toggleUserMenu"><i class="fas fa-user"></i> Open user menu</li>
          <li><i class="fas fa-bell"></i> Open notifications</li>
        </ul>

        <div v-if="showUserMenu" class="submenu">
          <p><strong>Username:</strong> Max Mustermann</p>
          <p>Aufgaben: 27</p>
          <ul>
            <li><i class="fas fa-cog"></i> Settings</li>
            <li><i class="fas fa-print"></i> Print</li>
            <li><i class="fas fa-star"></i> Upgrade</li>
            <li><i class="fas fa-sign-out-alt"></i> Logout</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h4>Help</h4>
        <ul>
          <li @click="toggleShortcuts"><i class="fas fa-keyboard"></i> Show keyboard shortcuts</li>
        </ul>

        <div v-if="showShortcuts" class="shortcuts">
<pre>
General:
  <strong>Enter</strong> - Open task view
  <strong>X</strong>     - Select task
  <strong>↑ ↓</strong>    - Move up/down
  <strong>Q</strong>     - Quick Add
  <strong>M</strong>     - Open/Close Sidebar
</pre>
        </div>
      </div>

      <div class="section">
        <h4>Miscellaneous</h4>
        <ul>
          <li><i class="fas fa-print"></i> Print current view</li>
          <li><i class="fas fa-columns"></i> Open/close sidebar</li>
        </ul>
      </div>

      <div class="section">
        <h4>Settings</h4>
        <ul>
          <li><i class="fas fa-bell"></i> Reminder</li>
          <li><i class="fas fa-bell-slash"></i> Notifications</li>
          <li><i class="fas fa-cloud"></i> Backups</li>
        </ul>
      </div>

      <div class="section">
        <h4>Account</h4>
        <ul>
          <li><i class="fas fa-user"></i> Account</li>
          <li><i class="fas fa-envelope"></i> Change email address</li>
          <li><i class="fas fa-key"></i> Change password</li>
          <li><i class="fas fa-shield-alt"></i> Recovery codes</li>
          <li><i class="fas fa-trash-alt"></i> Delete account</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const searchQuery = ref('')
const showUserMenu = ref(false)
const showShortcuts = ref(false)

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function toggleShortcuts() {
  showShortcuts.value = !showShortcuts.value
}

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({ open, close })
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  overflow-y: auto;
}

.popup {
  background: white;
  max-height: 90vh;
  width: 600px;
  padding: 1.5rem;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.section {
  margin-bottom: 1.5rem;
}

.section h4 {
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.95rem;
  text-transform: uppercase;
  font-weight: bold;
}

.section ul {
  list-style: none;
  padding-left: 1rem;
}

.section ul li {
  margin-bottom: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submenu {
  background-color: #f5f5f5;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
}

.shortcuts {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  font-family: monospace;
  font-size: 0.85rem;
  white-space: pre-line;
}
</style>
