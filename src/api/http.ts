import axios from 'axios';

// const baseURL = 'http://127.0.0.1:4523/m1/5633338-5313100-default'
const baseURL = 'http://127.0.0.1:8000'


const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (config.url === '/api/auth/login') {
            return config;
        }
        const token = localStorage.getItem('token'); // 从本地存储中获取 token
        if (!token) {
            window.location.href = '/login';
            return Promise.reject(new Error('Token is missing, redirecting to login.'));
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => {
        const { code, data, msg } = response.data;
        if (code !== 0) {
            return Promise.reject(new Error(msg || 'Error'));
        }
        return response.data; // 返回解析后的 data 部分
    },
    (error) => {

        console.error('API error:', error);
        // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        //     window.location.href = '/login';
        // }
        return Promise.reject(error);
    }
);

export default api;
