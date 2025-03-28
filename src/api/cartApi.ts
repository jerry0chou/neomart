import api from "./http.ts";
import {BaseResponse} from "./userApi.ts";
import {AxiosError} from "axios";

export interface CartItem {
    cart_id: number;
    product_id: number;
    quantity: number;
    product_name: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
}

export interface CheckoutResponse extends BaseResponse {
    final_total?: number;
    credits_earned?: number;
    remaining_credits?: number;
}

export interface CouponResponse extends BaseResponse {
    original_total?: number;
    discount_percentage?: number;
    discount_amount?: number;
    new_total?: number;
}

// Get cart items with optional category filter
export async function getCartItems(email: string, category?: string): Promise<CartItem[]> {
    try {
        const response = await api.get<CartItem[]>('/api/cart', {
            params: {
                email,
                ...(category ? { category } : {})
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get cart items error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to fetch cart items');
    }
}

// Add or update item in cart
export async function addToCart(product_id: number, quantity: number, email: string): Promise<BaseResponse> {
    try {
        const response = await api.post<{message: string}>('/api/cart', {
            product_id,
            quantity,
            email
        });
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Add to cart error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to add item to cart' };
    }
}

// Update item quantity in cart
export async function updateQuantity(cart_id: number, product_id: number, quantity: number, email: string, increment: boolean): Promise<BaseResponse> {
    try {
        const operationQuantity = increment ? 1 : -1;
        return await addToCart(product_id, operationQuantity, email);
    } catch (error) {
        console.error('Update quantity error:', error);
        return { status: 'error', message: 'Failed to update quantity' };
    }
}

// Remove item from cart
export async function removeFromCart(cart_id: number, product_id: number, email: string): Promise<BaseResponse> {
    try {
        const response = await api.delete<{message: string}>(`/api/cart/${cart_id}/products/${product_id}`, {
            data: { email }  // For DELETE requests, use data instead of params
        });
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Remove from cart error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to remove item from cart' };
    }
}

// Process checkout
export async function checkout(email: string, credits_to_apply?: number): Promise<CheckoutResponse> {
    try {
        const response = await api.post<CheckoutResponse>('/api/cart/checkout', {
            email,
            credits_to_apply
        });
        return {
            status: 'success',
            message: response.data.message,
            final_total: response.data.final_total,
            credits_earned: response.data.credits_earned,
            remaining_credits: response.data.remaining_credits
        };
    } catch (error) {
        console.error('Checkout error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Checkout failed' };
    }
}

// Apply coupon
export async function applyCoupon(coupon_code: string, email: string): Promise<CouponResponse> {
    try {
        const response = await api.post<CouponResponse>('/api/cart/apply-coupon', {
            coupon_code,
            email
        });
        return {
            status: 'success',
            message: response.data.message,
            original_total: response.data.original_total,
            discount_percentage: response.data.discount_percentage,
            discount_amount: response.data.discount_amount,
            new_total: response.data.new_total
        };
    } catch (error) {
        console.error('Apply coupon error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to apply coupon' };
    }
} 