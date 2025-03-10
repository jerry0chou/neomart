import api from "./http.ts";
import {AxiosError} from "axios";

export async function register(username: string, email: string, password: string): Promise<{status: 'success'| 'error', message: string}>{
    try {
        const response = await api.post<{message?: string}>('/register', {username, email, password, confirm_password: password });
        console.log('register res',response);
        const { message } = response.data;
        if(message) return {status: 'success',message}
        else return {status: 'error', message: 'server error'};
    } catch (error ) {
        console.error('register error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        if (err) return  { status: 'error', message: err || 'An error occurred'};
        return {status: 'error', message: 'login error'};
    }
}

// export async function login(email: string, password: string): Promise<boolean>{
//     try {
//         const response = await api.post<UserRegister>('/login', { email, password });
//         console.log('login res',response);
//         const { access_token, user_id } = response.data;
//         localStorage.setItem('token', access_token);
//         localStorage.setItem('user_id', user_id);
//         return true;
//     } catch (error) {
//         console.error('Login error:', error);
//         return false
//     }
// }

