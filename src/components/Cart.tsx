import React, { useEffect, useState } from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Spin } from 'antd';
import { CartItem, getCartItems, removeFromCart, applyCoupon, checkout, updateQuantity } from '../api/cartApi';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [creditsToApply, setCreditsToApply] = useState<number>(0);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchCartItems = async () => {
        setLoading(true);
        try {
            const items = await getCartItems();
            setCartItems(items);
        } catch (error) {
            messageApi.error('Failed to fetch cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleQuantityChange = async (cartId: number, productId: number, newQuantity: number, stock: number) => {
        if (newQuantity < 1) {
            messageApi.warning('Quantity cannot be less than 1');
            return;
        }
        if (newQuantity > stock) {
            messageApi.warning('Not enough stock available');
            return;
        }

        try {
            const response = await updateQuantity(cartId, productId, newQuantity);
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
        try {
            const response = await removeFromCart(cartId, productId);
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
        if (!couponCode.trim()) {
            messageApi.warning('Please enter a coupon code');
            return;
        }

        try {
            const response = await applyCoupon(couponCode);
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
        try {
            const response = await checkout(creditsToApply);
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
                                onChange={(e) => setCreditsToApply(Number(e.target.value))}
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