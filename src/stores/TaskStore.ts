import { defineStore } from 'pinia'
import {
  getAllTasks,
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  markComplete as markCompleteApi
} from '@/services/TaskApi' // ✅ Pfad ggf. anpassen
import { updateTask as updateTaskApi } from '@/services/TaskApi'


export interface Task {
  id: number
  title: string
  description?: string
  priority: number
  completed: boolean
  createdAt: string
  completedAt?: string
  dueDate?: string | null
  recurring?: string // z.B. 'daily', 'weekly'
  status?: string    // z.B. 'open', 'in progress', 'done'
  user?: string      // z.B. Benutzername oder ID
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async loadTasks() {
      try {
        this.tasks = await getAllTasks()
      } catch (err) {
        console.error('Fehler beim Laden:', err)
      }
    },

    async addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
      try {
        const created = await createTaskApi(task)
        this.tasks.push(created)
      } catch (err) {
        console.error('Fehler beim Hinzufügen:', err)
      }
    },

    async deleteTask(id: number) {
      try {
        await deleteTaskApi(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        console.error('Fehler beim Löschen:', err)
      }
    },

    async completeTask(id: number) {
      try {
        const updated = await markCompleteApi(id)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) this.tasks[index] = updated
      } catch (err) {
        console.error('Fehler beim Aktualisieren:', err)
      }
    },

    async editTask(updatedTask: Task) {
      try {
        const savedTask = await updateTaskApi(updatedTask)
        const index = this.tasks.findIndex(t => t.id === savedTask.id)
        if (index !== -1) {
          this.tasks[index] = savedTask
        }
      } catch (err) {
        console.error('Fehler beim Bearbeiten:', err)
      }
    },

    // 🔹 Beispiel: Filter für "Heute"
    getTodayTasks(): Task[] {
      const today = new Date().toISOString().split('T')[0]
      return this.tasks.filter(t => t.dueDate && new Date(t.dueDate).toISOString().startsWith(today))
    },

    // 🔹 Beispiel: Filter für "Erledigt"
    getCompletedTasks(): Task[] {
      return this.tasks.filter(t => t.completed)
    },

    // 🔹 Beispiel: Filter für "Bevorstehend"
    getUpcomingTasks(): Task[] {
      const now = new Date()
      return this.tasks.filter(t => t.dueDate && new Date(t.dueDate) > now && !t.completed)
    },
  },
})
