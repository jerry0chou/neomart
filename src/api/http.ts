import axios from 'axios';

// const baseURL = 'http://127.0.0.1:4523/m1/5633338-5313100-default'
const baseURL = 'https://ecommerceapi-production-48c7.up.railway.app/api/auth'


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
        if (config.url === '/login' || config.url === '/register') {
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
    (response) => {
        // const { code, data, msg } = response.data;
        // if (code !== 0) {
        //     return Promise.reject(new Error(msg || 'Error'));
        // }
        return response; // 返回解析后的 data 部分
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
