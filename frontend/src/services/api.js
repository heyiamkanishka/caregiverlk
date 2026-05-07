import axios from 'axios';

// In production, Nginx handles the routing. 
// In development, we can use a base URL or Vite proxy.
const API_BASE_URL = ''; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const caregiverService = {
  getAll: () => api.get('/api/caregivers'),
  getById: (id) => api.get(`/api/caregivers/${id}`),
  create: (data) => api.post('/api/caregivers', data),
};

export const agencyService = {
  getAll: () => api.get('/api/agencies'),
  getById: (id) => api.get(`/api/agencies/${id}`),
  create: (data) => api.post('/api/agencies', data),
};

export const reviewService = {
  getByTarget: (targetId) => api.get(`/api/reviews/target/${targetId}`),
  create: (data) => api.post('/api/reviews', data),
};

export default api;
