import api from "./http.ts";
import {BaseResponse} from "./userApi.ts";
import {AxiosError} from "axios";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    seller_id: number;
    category_id: number;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface LatestResponse {
    featured_products: Product[];
    categories: Category[];
    best_sellers: Product[];
}

export interface DailyLoginResponse extends BaseResponse {
    streak?: number;
    reward?: number;
}

export interface PaginatedProducts {
    current_page: number;
    pages: number;
    total: number;
    products: Product[];
}

// Get all products
export async function getHomeList(category_id?: string): Promise<Product[]> {
    try {
        const params: Record<string, any> = {};
        if (category_id && category_id !== 'all') {
            params.category = category_id;
        }
        
        const response = await api.get<Product[]>('/api/home', { params });
        return response.data;
    } catch (error) {
        console.error('Get home list error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to fetch home list');
    }
}

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>('/api/home/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Get latest products, categories, and best sellers
export async function getLatest(): Promise<LatestResponse> {
    try {
        const response = await api.get<LatestResponse>('/api/home/latest');
        return response.data;
    } catch (error) {
        console.error('Get latest error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to fetch latest data');
    }
}

// Record daily login
export async function recordDailyLogin(user_id: number): Promise<DailyLoginResponse> {
    try {
        const response = await api.post<DailyLoginResponse>('/api/home/daily', { user_id });
        return {
            status: 'success',
            message: response.data.message,
            streak: response.data.streak,
            reward: response.data.reward
        };
    } catch (error) {
        console.error('Daily login error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to record daily login' };
    }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
    try {
        const response = await api.get<Product[]>('/api/home/search', { 
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        console.error('Search products error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to search products');
    }
}