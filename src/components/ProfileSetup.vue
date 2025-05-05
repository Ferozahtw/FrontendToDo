<template>
  <div class="account-settings">
    <header class="header">
      <h2>Account</h2>
      <button class="close-btn">✕</button>
    </header>

    <!-- Plan -->
    <div class="plan-section">
      <div>
        <div class="label">Plan</div>
        <div class="value">Beginner</div>
      </div>
      <button class="manage-btn">Manage plan</button>
    </div>

    <hr />

    <!-- Foto -->
    <div class="photo-section">
      <div class="label">Photo</div>
      <div class="photo-block">
        <div class="avatar">{{ name.charAt(0).toUpperCase() }}</div>
        <div class="photo-actions">
          <button class="change-photo">Change photo</button>
          <button class="remove-photo">Remove photo</button>
          <small>Pick a photo up to 4MB. Your avatar photo will be public.</small>
        </div>
      </div>
    </div>

    <!-- Name -->
    <div class="field-group">
      <label for="name">Name</label>
      <input v-model="name" id="name" type="text" />
      <div class="char-count">{{ name.length }}/255</div>
    </div>

    <!-- Email -->
    <div class="field-group">
      <label for="email">Email</label>
      <div class="value-group">
        <span>{{ email }}</span>
        <button class="secondary-btn" @click="changeEmail">Change email</button>
      </div>
    </div>

    <!-- Password -->
    <div class="field-group">
      <label for="password">Password</label>
      <button class="secondary-btn" @click="addPassword">Add password</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('Feroza Fiaz');
const email = ref('ferozahtw@gmail.com');

const changeEmail = () => {
  alert('E-Mail ändern');
};

const addPassword = () => {
  alert('Passwort hinzufügen');
};
</script>

<style scoped>
.account-settings {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: system-ui, sans-serif;
  color: #1f1f1f;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.plan-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.label {
  font-size: 0.9rem;
  color: #666;
}

.value {
  font-weight: 500;
}

.manage-btn {
  background-color: #f3f4f6;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

hr {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #eee;
}

.photo-section {
  margin-bottom: 1.5rem;
}

.photo-block {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.avatar {
  width: 64px;
  height: 64px;
  background-color: #f34f1c;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.photo-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.change-photo {
  background-color: #e5e7eb;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-photo {
  background-color: transparent;
  color: #dc2626;
  border: 1px solid #dc2626;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.field-group {
  margin-bottom: 1.5rem;
}

.field-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

input[type="text"] {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.char-count {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.3rem;
  text-align: right;
}

.value-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.secondary-btn {
  background-color: #f3f4f6;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
