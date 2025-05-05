<template>
  <div>
    <h2>ToDo Liste</h2>
    <div class="filter">
      <button @click="filterTodos('all')">Alle</button>
      <button @click="filterTodos('done')">Erledigt</button>
      <button @click="filterTodos('undone')">Nicht erledigt</button>
      <button @click="openAddTaskOverlay" class="add-task-button">
        ➕ Neue Aufgabe
      </button>
    </div>
    <transition-group name="fade" tag="ul">
      <ToDoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo(todo.id)"
        @toggleDone="toggleTodoDone(todo)"
      />
    </transition-group>

    <AddTaskOverlay ref="addTaskOverlayRef" @add-task="handleAddTask" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AddTaskOverlay from './AddTaskOverlay.vue'
import ToDoItem from './ToDoItem.vue'

const addTaskOverlayRef = ref<InstanceType<typeof AddTaskOverlay> | null>(null)

function openAddTaskOverlay() {
  addTaskOverlayRef.value?.open()
}

function handleAddTask(newTask: Todo) {
  todos.value.push({ ...newTask, id: Date.now(), done: false })
}

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const todos = ref<Todo[]>([
  { id: 1, text: 'Einkaufen', done: false },
  { id: 2, text: 'Hausaufgaben machen', done: false },
  { id: 3, text: 'Fahrrad reparieren', done: true },
])

const filterStatus = ref('all')

const filterTodos = (status: string): void => {
  filterStatus.value = status
}

const filteredTodos = computed(() => {
  const result = todos.value

  if (filterStatus.value === 'done') {
    return result.filter(todo => todo.done)
  } else if (filterStatus.value === 'undone') {
    return result.filter(todo => !todo.done)
  } else {
    return [...result].sort((a, b) => Number(a.done) - Number(b.done))
  }
})

const deleteTodo = (id: number): void => {
  const index = todos.value.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}

const toggleTodoDone = (todo: Todo): void => {
  todo.done = !todo.done
}
</script>

<style scoped>
.filter {
  margin-bottom: 10px;
}

.filter button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.filter button:hover {
  background-color: #3d9b72;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

li.done {
  background-color: var(--color-background-soft);
  border-left: 4px solid green;
}

.add-task-button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.add-task-button:hover {
  background-color: #36986c;
}
</style>
