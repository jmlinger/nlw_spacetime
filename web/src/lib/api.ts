import axios from 'axios'

// Cria uma url base para acessar o backend.
export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
