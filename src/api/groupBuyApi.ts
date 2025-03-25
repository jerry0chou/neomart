import api from "./http.ts";
import {BaseResponse} from "./userApi.ts";
import {AxiosError} from "axios";

export interface GroupBuy {
    id: number;
    product_id: number;
    discount_percentage: number;
    min_participants: number;
    current_participants: number;
    unique_link: string;
    is_active: boolean;
}

export interface CreateGroupBuyResponse extends BaseResponse {
    group_buy_id?: number;
    unique_link?: string;
}

export interface ApplyDiscountResponse extends BaseResponse {
    original_price?: number;
    discounted_price?: number;
}

// Create a new group buy
export async function createGroupBuy(
    product_id: number,
    discount_percentage: number,
    min_participants: number
): Promise<CreateGroupBuyResponse> {
    try {
        const response = await api.post<CreateGroupBuyResponse>('/api/groupbuy', {
            product_id,
            discount_percentage,
            min_participants
        });
        return {
            status: 'success',
            message: response.data.message,
            group_buy_id: response.data.group_buy_id,
            unique_link: response.data.unique_link
        };
    } catch (error) {
        console.error('Create group buy error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to create group buy' };
    }
}

// Get group buy details
export async function getGroupBuy(unique_link: string): Promise<GroupBuy> {
    try {
        const response = await api.get<GroupBuy>(`/api/groupbuy/${unique_link}`);
        return response.data;
    } catch (error) {
        console.error('Get group buy error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to fetch group buy details');
    }
}

// Join a group buy
export async function joinGroupBuy(unique_link: string): Promise<BaseResponse> {
    try {
        const response = await api.post<{message: string}>(`/api/groupbuy/join/${unique_link}`);
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Join group buy error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to join group buy' };
    }
}

// Apply group buy discount to cart
export async function applyGroupBuyDiscount(
    cart_id: number,
    group_buy_id: number
): Promise<ApplyDiscountResponse> {
    try {
        const response = await api.post<ApplyDiscountResponse>(`/api/groupbuy/apply-discount/${cart_id}`, {
            group_buy_id
        });
        return {
            status: 'success',
            message: response.data.message,
            original_price: response.data.original_price,
            discounted_price: response.data.discounted_price
        };
    } catch (error) {
        console.error('Apply group buy discount error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to apply group buy discount' };
    }
} 