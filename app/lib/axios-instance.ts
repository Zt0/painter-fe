"use client";
import axios from 'axios';
import { log } from 'console';
import { redirect } from 'next/navigation';

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Check if error has response
        if (error.response) {
            // Check for 401 status and JWT expired message
            console.log(234, error.response.status,  error.response.data?.message)
            if (
                error.response.status === 401 && 
            ['jwt expired', 'jwt malformed'].includes( error.response.data?.message)
            ) {
                // Clear local storage
                console.log(325235235)
                localStorage.removeItem('accessToken');
                // Redirect to login page
                redirect('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;