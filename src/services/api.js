import axios from 'axios';

// Assume backend is running on localhost:5000, but can be changed later.
const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

export const getItems = () => api.get('/items');
export const addItem = (item) => api.post('/items', item);
export const convertUnits = (data) => api.post('/convert', data);

export default api;
