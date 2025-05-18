import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  description?: string
  priority: number
  completed: boolean
  createdAt: string
  completedAt?: string
  dueDate?: Date
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
        const res = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + '/task')
        if (!res.ok) throw new Error('Fehler beim Laden der Aufgaben')
        const data: Task[] = await res.json()
        this.tasks = data
      } catch (err) {
        console.error('Laden fehlgeschlagen:', err)
      }
    },

    async addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + '/task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        })
        if (!res.ok) throw new Error('Fehler beim Erstellen')
        const created = await res.json()
        this.tasks.push(created)
      } catch (err) {
        console.error('Fehler beim Hinzufügen:', err)
      }
    },

    async deleteTask(id: number) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/task/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('Fehler beim Löschen')
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        console.error('Fehler beim Löschen:', err)
      }
    },

    async completeTask(id: number) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return

      try {
        const updated = { ...task, completed: !task.completed }
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/task/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        })
        if (!res.ok) throw new Error('Fehler beim Aktualisieren')
        const returned = await res.json()
        const index = this.tasks.findIndex(t => t.id === id)
        this.tasks[index] = returned
      } catch (err) {
        console.error('Fehler beim Aktualisieren:', err)
      }
    },

    // Beispiel: Filter für "Heute"
    getTodayTasks(): Task[] {
      const today = new Date().toISOString().split('T')[0]
      return this.tasks.filter(t => t.dueDate && new Date(t.dueDate).toISOString().startsWith(today))
    },

    // Beispiel: Filter für "Erledigt"
    getCompletedTasks(): Task[] {
      return this.tasks.filter(t => t.completed)
    },

    // Beispiel: Filter für "Upcoming"
    getUpcomingTasks(): Task[] {
      const now = new Date()
      return this.tasks.filter(t => t.dueDate && new Date(t.dueDate) > now && !t.completed)
    },
  },
})
