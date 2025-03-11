import api from "./http.ts";
import {AxiosError} from "axios";

export interface BaseResponse {
    status: 'success'| 'error';
    message: string;
}

export interface TokenResponse extends BaseResponse {
    access_token?: string
}

export async function register(username: string, email: string, password: string): Promise<BaseResponse>{
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

export async function login(email: string, password: string, remember: boolean): Promise<TokenResponse>{
    try {
        const response = await api.post<{ access_token: string}>('/login', { email, password, remember });
        console.log('login res',response);
        const { access_token } = response.data;
        if(access_token){
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('email', email);
            return {status: 'success', message: '', access_token}
        }
        else return {status: 'error', message: 'access_token is none', access_token: ''};
    } catch (error) {
        console.error('Login error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        if (err) return  { status: 'error', message: err || 'An error occurred', access_token: ''};
        return {status: 'error', message: 'login error', access_token: ''};
    }
}

