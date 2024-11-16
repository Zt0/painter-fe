"use client";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request config before it's sent
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify response data before it's returned
        return response.data;
    },
    (error) => {
        // Handle response errors
        if (error.response.status === 401) {
            // Handle 401 Unauthorized errors
            // e.g. redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;