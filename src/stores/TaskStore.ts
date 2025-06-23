import { defineStore } from 'pinia'
import {
  getAllTasks,
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  markComplete as markCompleteApi,
  updateTask as updateTaskApi
} from '@/services/TaskApi'

export interface Task {
  id: number
  title: string
  description?: string
  priority: number
  completed: boolean
  createdAt: string
  completedAt?: string
  dueDate?: string | null
  recurring?: string
  status?: string
  user?: string
  attachments?: string[]
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadTasks() {
      this.loading = true
      this.error = null
      try {
        this.tasks = await getAllTasks()
      } catch (err: unknown) {
        this.error = 'Fehler beim Laden der Aufgaben'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
      this.loading = true
      this.error = null
      try {
        const created = await createTaskApi(task)
        this.tasks.push(created)
      } catch (err: unknown) {
        this.error = 'Fehler beim Hinzufügen'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id: number) {
      this.loading = true
      this.error = null
      try {
        await deleteTaskApi(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err: unknown) {
        this.error = 'Fehler beim Löschen'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async completeTask(id: number) {
      this.loading = true
      this.error = null
      try {
        const updated = await markCompleteApi(id)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) this.tasks[index] = updated
      } catch (err: unknown) {
        this.error = 'Fehler beim Abschließen'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async editTask(updatedTask: Task) {
      this.loading = true
      this.error = null
      try {
        const savedTask = await updateTaskApi(updatedTask)
        const index = this.tasks.findIndex(t => t.id === savedTask.id)
        if (index !== -1) this.tasks[index] = savedTask
      } catch (err: unknown) {
        this.error = 'Fehler beim Bearbeiten'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    getTodayTasks(): Task[] {
      const today = new Date()
      const todayStart = new Date(today.setHours(0, 0, 0, 0))
      const todayEnd = new Date(today.setHours(23, 59, 59, 999))

      return this.tasks
        .filter(t => {
          if (!t.dueDate) return false
          const due = new Date(t.dueDate)
          return due >= todayStart && due <= todayEnd
        })
        .sort((a, b) => a.priority - b.priority)
    },

    getCompletedTasks(): Task[] {
      return this.tasks.filter(t => t.completed)
    },

    getUpcomingTasks(): Task[] {
      const now = new Date()
      return this.tasks
        .filter(t => t.dueDate && new Date(t.dueDate) > now && !t.completed)
        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    },
  },
})
