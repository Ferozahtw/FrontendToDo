<script setup lang="ts">
import { ref } from 'vue'

const selectedLanguage = ref('en')
const selectedWeekStart = ref('Monday')
const selectedWeekendDays = ref<string[]>([])  // Array for weekend days

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ko', name: '한국어' },
  { code: 'pl', name: 'Polski' },
  { code: 'uk', name: 'Українська' },
  { code: 'sv', name: 'Svenska' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'ro', name: 'Română' },
  { code: 'fa', name: 'فارسی' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'th', name: 'ไทย' }
]

const weekStartOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const weekendDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const notificationOptions = ['All', 'None', 'Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']
const themes = ['Light', 'Dark', 'Blueberry', 'Lavender', 'Red', 'Tangerine']

// Function to handle adding/removing weekend days
const toggleWeekendDay = (day: string) => {
  const index = selectedWeekendDays.value.indexOf(day)
  if (index === -1) {
    selectedWeekendDays.value.push(day)
  } else {
    selectedWeekendDays.value.splice(index, 1)
  }
}

const selectedNotifications = ref('All')
const selectedTheme = ref('Light')
</script>

<template>
  <div :class="selectedTheme.toLowerCase() + '-theme'" class="settings-container">
    <h1>Settings</h1>

    <!-- Language Setting -->
    <div class="setting-block">
      <label for="language">Language</label>
      <select v-model="selectedLanguage" id="language">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </div>

    <!-- Week Start Setting -->
    <div class="setting-block">
      <label for="weekStart">Week Start</label>
      <select v-model="selectedWeekStart" id="weekStart">
        <option v-for="day in weekStartOptions" :key="day" :value="day">
          {{ day }}
        </option>
      </select>
    </div>

    <!-- Weekend Days Setting -->
    <div class="setting-block">
      <label for="weekendDays">Weekend Days</label>
      <div class="weekend-days">
        <div
          v-for="day in weekendDaysOptions"
          :key="day"
          :class="['weekend-day', { selected: selectedWeekendDays.includes(day) }]"
          @click="toggleWeekendDay(day)"
        >
          {{ day }}
        </div>
      </div>
      <div class="selected-days">
        <span v-for="day in selectedWeekendDays" :key="day" class="tag">{{ day }}</span>
      </div>
    </div>

    <!-- Notifications Setting -->
    <div class="setting-block">
      <label for="notifications">Notifications</label>
      <select v-model="selectedNotifications" id="notifications">
        <option v-for="option in notificationOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Theme Setting -->
    <div class="setting-block">
      <label for="theme">Theme</label>
      <select v-model="selectedTheme" id="theme">
        <option v-for="theme in themes" :key="theme" :value="theme">
          {{ theme }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: system-ui, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.setting-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

select {
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.weekend-days {
  display: flex;
  flex-wrap: wrap;
}

.weekend-day {
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  cursor: pointer;
}

.weekend-day.selected {
  background-color: #4CAF50;
  color: white;
}

.selected-days {
  margin-top: 1rem;
}

.selected-days .tag {
  display: inline-block;
  background-color: #E0E0E0;
  color: #333;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  margin: 0.3rem;
}

.light-theme {
  background-color: #fff;
  color: #333;
}

.dark-theme {
  background-color: #333;
  color: #fff;
}

.blueberry-theme {
  background-color: #4f6d7a;
  color: #fff;
}

.lavender-theme {
  background-color: #e6e6fa;
  color: #4f4f4f;
}

.red-theme {
  background-color: #f44336;
  color: #fff;
}

.tangerine-theme {
  background-color: #ff6347;
  color: #fff;
}
</style>
