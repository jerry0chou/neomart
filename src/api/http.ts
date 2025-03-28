import axios from 'axios';

// const baseURL = 'http://127.0.0.1:4523/m1/5633338-5313100-default'
const baseURL = 'https://ecommerceapi-production-48c7.up.railway.app'


const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('config',config,'config.url', config.url);
        console.log('access_token',localStorage.getItem('access_token'));
        if (config.url === '/api/auth/login' || config.url === '/api/auth/register') {
            return config;
        }
        const token = localStorage.getItem('access_token'); // 从本地存储中获取 token
        if (!token) {
            window.location.href = '/auth';
            return Promise.reject(new Error('Token is missing, redirecting to login.'));
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error);
        
        // Handle authentication errors
        // if (error.response) {
        //     const { status } = error.response;
        //     // if (status === 401 || status === 403) {
        //         // Clear invalid token
        //         // localStorage.removeItem('access_token');
        //         localStorage.removeItem('email');
        //         // Redirect to login
        //         window.location.href = '/auth';
        //         return Promise.reject(new Error('Authentication failed. Please login again.'));
        //     // }
        // }
        
        return Promise.reject(error);
    }
);

export default api;
