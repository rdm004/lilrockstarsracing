// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
    withCredentials: true, // Ensure cookies and credentials are sent
});

// 🔐 Automatically attach JWT token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
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

// 🚨 Optional: Centralized response error logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            console.warn('🚫 403 Forbidden: Access denied or invalid role.');
        }
        if (error.response?.status === 401) {
            console.warn('🔒 401 Unauthorized: Token missing or expired.');
        }
        return Promise.reject(error);
    }
);

export default api;