// apiClients.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://todo-backend-uaik.onrender.com', // <- hier deine API-URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
