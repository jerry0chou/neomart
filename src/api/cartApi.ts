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
export async function getCartItems(category?: string): Promise<CartItem[]> {
    try {
        const response = await api.get<CartItem[]>('/cart', {
            params: category ? { category } : undefined
        });
        return response.data;
    } catch (error) {
        console.error('Get cart items error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        throw new Error(err || 'Failed to fetch cart items');
    }
}

// Add or update item in cart
export async function addToCart(product_id: number, quantity: number): Promise<BaseResponse> {
    try {
        const response = await api.post<{message: string}>('/cart', {
            product_id,
            quantity
        });
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Add to cart error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to add item to cart' };
    }
}

// Update item quantity in cart
export async function updateQuantity(cart_id: number, product_id: number, quantity: number): Promise<BaseResponse> {
    try {
        const response = await api.put<{message: string}>(`/cart/${cart_id}/products/${product_id}`, {
            quantity
        });
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Update quantity error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to update quantity' };
    }
}

// Remove item from cart
export async function removeFromCart(cart_id: number, product_id: number): Promise<BaseResponse> {
    try {
        const response = await api.delete<{message: string}>(`/cart/${cart_id}/products/${product_id}`);
        return { status: 'success', message: response.data.message };
    } catch (error) {
        console.error('Remove from cart error:', error);
        const err = (error as AxiosError<{error?: string}>).response?.data?.error;
        return { status: 'error', message: err || 'Failed to remove item from cart' };
    }
}

// Process checkout
export async function checkout(credits_to_apply?: number): Promise<CheckoutResponse> {
    try {
        const response = await api.post<CheckoutResponse>('/cart/checkout', {
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
export async function applyCoupon(coupon_code: string): Promise<CouponResponse> {
    try {
        const response = await api.post<CouponResponse>('/cart/apply-coupon', {
            coupon_code
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