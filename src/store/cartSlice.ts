import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem, getCartItems, addToCart, updateQuantity, removeFromCart } from '../api/cartApi';

interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null
};

// Async thunks
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async ({ email, category }: { email: string; category?: string }) => {
        const response = await getCartItems(email, category);
        return response;
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ product_id, quantity, email }: { product_id: number; quantity: number; email: string }) => {
        const response = await addToCart(product_id, quantity, email);
        if (response.status === 'success') {
            // Refresh cart items after adding
            return await getCartItems(email);
        }
        throw new Error(response.message);
    }
);

export const updateItemQuantity = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ cart_id, product_id, quantity, email }: { cart_id: number; product_id: number; quantity: number; email: string }) => {
        const response = await updateQuantity(cart_id, product_id, quantity, email);
        if (response.status === 'success') {
            // Refresh cart items after updating
            return await getCartItems(email);
        }
        throw new Error(response.message);
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async ({ cart_id, product_id, email }: { cart_id: number; product_id: number; email: string }) => {
        const response = await removeFromCart(cart_id, product_id, email);
        if (response.status === 'success') {
            // Refresh cart items after removing
            return await getCartItems(email);
        }
        throw new Error(response.message);
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart items
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart items';
            })
            // Add item to cart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add item to cart';
            })
            // Update item quantity
            .addCase(updateItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update quantity';
            })
            // Remove item from cart
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove item from cart';
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 