import axios from 'axios'
import type { Task } from '@/stores/TaskStore.ts' // ✅ Passe den Pfad an, falls TaskStore woanders liegt

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL + '/task'

// 🔹 Neue Aufgabe erstellen
export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'completed'>): Promise<Task> => {
  const response = await axios.post(BASE_URL, task)
  return response.data
}

// 🔹 Alle Aufgaben laden
export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(BASE_URL)
  return response.data
}

// 🔹 Aufgabe löschen
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}

// 🔹 Aufgabe vollständig aktualisieren (PUT)
export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${BASE_URL}/${task.id}`, task)
  return response.data
}

// 🔹 Aufgabe als erledigt markieren (PUT /complete)
export const markComplete = async (id: number): Promise<Task> => {
  const response = await axios.put(`${BASE_URL}/${id}/complete`)
  return response.data
}
