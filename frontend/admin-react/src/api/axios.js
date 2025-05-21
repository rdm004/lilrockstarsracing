// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, // Needed if backend has allowCredentials(true)
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt'); // Ensure this matches LoginForm
        console.log('🔐 JWT from localStorage:', token);

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('✅ Authorization header set:', config.headers['Authorization']);
        } else {
            console.warn('⚠️ No token found in localStorage');
        }

        return config;
    },
    (error) => {
        console.error('❌ Axios request error:', error);
        return Promise.reject(error);
    }
);

export default api;