import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

export const getItems = () => api.get('/items');
export const addItem = (item) => api.post('/items', item);
export const convertUnits = (data) => api.post('/convert', data);

export default api;
