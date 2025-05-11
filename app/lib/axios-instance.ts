// "use client" not necessary here since this is now safe
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Request interceptor to set token dynamically on client side
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (typeof window !== 'undefined') {
            if (
                error.response?.status === 401 &&
                ['jwt expired', 'jwt malformed'].includes(error.response.data?.message)
            ) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login'; // redirect() doesn't work in client context
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
