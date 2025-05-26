import type { Task } from '@/stores/TaskStore'
import apiClient from './apiClients' // Dein vorkonfigurierter Axios-Client

// 🔹 Neue Aufgabe erstellen
export const createTask = async (
  task: Omit<Task, 'id' | 'createdAt' | 'completed'>
): Promise<Task> => {
  const response = await apiClient.post('/task', task)
  return response.data
}

// 🔹 Alle Aufgaben laden
export const getAllTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/task')
  return response.data
}

// 🔹 Aufgabe löschen
export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/task/${id}`)
}

// 🔹 Aufgabe vollständig aktualisieren (PUT)
export const updateTask = async (task: Task): Promise<Task> => {
  const response = await apiClient.put(`/task/${task.id}`, task)
  return response.data
}

// 🔹 Aufgabe als erledigt markieren (PUT /complete)
export const markComplete = async (id: number): Promise<Task> => {
  const response = await apiClient.put(`/task/${id}/complete`)
  return response.data
}
