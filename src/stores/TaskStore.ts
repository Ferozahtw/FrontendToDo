import { defineStore } from 'pinia'

interface Task {
  id: string
  title: string
  priority: number
  completed: boolean
  createdAt: string
  completedAt?: string
  dueDate?: Date // Hier ändern wir es zu Date
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      {
        id: '1',
        title: 'Create project presentation',
        priority: 1,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(), // Ändere es hier zu Date
      },
      {
        id: '2',
        title: 'Review team feedback',
        priority: 2,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(),
      },
      {
        id: '3',
        title: 'Update documentation',
        priority: 3,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000), // Ändere es zu Date
      },
      {
        id: '4',
        title: 'Setup development environment',
        priority: 1,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 172800000), // Ändere es zu Date
      },
    ] as Task[],
    completedTasks: [
      {
        id: '5',
        title: 'Initial project setup',
        priority: 2,
        completed: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        dueDate: new Date(Date.now() - 86400000), // Ändere es zu Date
      },
    ] as Task[],
  }),
  actions: {
    addTask(taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) {
      const newTask: Task = {
        id: generateId(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      this.tasks.push(newTask)
    },
    completeTask(taskId: string) {
      const index = this.tasks.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        const task = this.tasks.splice(index, 1)[0]
        task.completed = true
        task.completedAt = new Date().toISOString()
        this.completedTasks.push(task)
      }
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.completedTasks = this.completedTasks.filter((task) => task.id !== taskId)
    },
  },
})
