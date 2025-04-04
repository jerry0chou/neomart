import React, { useEffect, useState } from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Spin } from 'antd';
import { CartItem, getCartItems, removeFromCart, applyCoupon, checkout, updateQuantity } from '../api/cartApi';
import { useAppSelector } from '../store/hooks';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [creditsToApply, setCreditsToApply] = useState<string>('');
    const [messageApi, contextHolder] = message.useMessage();
    const userEmail = useAppSelector(state => state.user?.email);

    const fetchCartItems = async () => {
        if (!userEmail) return;
        setLoading(true);
        try {
            const items = await getCartItems(userEmail);
            setCartItems(items);
        } catch (error) {
            messageApi.error('Failed to fetch cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [userEmail]);

    const handleQuantityChange = async (cartId: number, productId: number, newQuantity: number, stock: number) => {
        if (!userEmail) return;
        if (newQuantity < 1) {
            messageApi.warning('Quantity cannot be less than 1');
            return;
        }
        if (newQuantity > stock) {
            messageApi.warning('Not enough stock available');
            return;
        }

        try {
            // Calculate if we need to increment or decrement based on current quantity
            const currentItem = cartItems.find(item => item.cart_id === cartId && item.product_id === productId);
            if (!currentItem) return;
            
            const increment = newQuantity > currentItem.quantity;
            const response = await updateQuantity(cartId, productId, newQuantity, userEmail, increment);
            if (response.status === 'success') {
                fetchCartItems(); // Refresh cart items
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (cartId: number, productId: number) => {
        if (!userEmail) return;
        try {
            const response = await removeFromCart(cartId, productId, userEmail);
            if (response.status === 'success') {
                messageApi.success('Item removed from cart');
                fetchCartItems(); // Refresh cart items
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Failed to remove item');
        }
    };

    const handleApplyCoupon = async () => {
        if (!userEmail) return;
        if (!couponCode.trim()) {
            messageApi.warning('Please enter a coupon code');
            return;
        }

        try {
            const response = await applyCoupon(couponCode, userEmail);
            if (response.status === 'success') {
                messageApi.success(`Coupon applied! You saved $${response.discount_amount?.toFixed(2)}`);
                fetchCartItems(); // Refresh cart to show updated prices
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Failed to apply coupon');
        }
    };

    const handleCheckout = async () => {
        if (!userEmail) return;
        try {
            const credits = creditsToApply ? parseInt(creditsToApply) : undefined;
            const response = await checkout(userEmail, credits);
            if (response.status === 'success') {
                messageApi.success('Checkout successful!');
                if (response.credits_earned) {
                    messageApi.success(`You earned ${response.credits_earned} credits!`);
                }
                setCartItems([]); // Clear cart after successful checkout
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Checkout failed');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {contextHolder}
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.cart_id} className="bg-white rounded-lg shadow p-4 flex items-center">
                                <img src={item.image_url} alt={item.product_name} className="w-24 h-24 object-cover rounded" />
                                <div className="ml-4 flex-grow">
                                    <h3 className="text-lg font-medium">{item.product_name}</h3>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button 
                                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                                            onClick={() => handleQuantityChange(item.cart_id, item.product_id, item.quantity - 1, item.stock)}
                                        >
                                            <MinusOutlined />
                                        </button>
                                        <span className="mx-4">{item.quantity}</span>
                                        <button 
                                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                                            onClick={() => handleQuantityChange(item.cart_id, item.product_id, item.quantity + 1, item.stock)}
                                        >
                                            <PlusOutlined />
                                        </button>
                                        <span className="ml-4 text-sm text-gray-500">({item.stock} available)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        onClick={() => handleRemoveItem(item.cart_id, item.product_id)}
                                        className="text-red-500 hover:text-red-700 mt-2"
                                    >
                                        <DeleteOutlined /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-white rounded-lg shadow p-4">
                        <div className="flex items-center mb-4">
                            <Input
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="mr-2"
                            />
                            <Button onClick={handleApplyCoupon} type="primary">
                                Apply Coupon
                            </Button>
                        </div>

                        <div className="flex items-center mb-4">
                            <Input
                                type="number"
                                placeholder="Credits to apply"
                                value={creditsToApply}
                                onChange={(e) => setCreditsToApply(e.target.value)}
                                className="mr-2"
                                min={0}
                            />
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={handleCheckout}
                                className="bg-pink-500 hover:bg-pink-600"
                            >
                                Checkout (${calculateTotal().toFixed(2)})
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 