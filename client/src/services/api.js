import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const carService = {
    getAllCars: (params) => api.get('/cars', { params }),
    getCarById: (id) => api.get(`/cars/${id}`),
    recommendCars: (preferences) => api.post('/recommend', preferences),
};

export default api;
