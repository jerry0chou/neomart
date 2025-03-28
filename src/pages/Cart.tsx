import React, { useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCartItems, updateItemQuantity, removeItemFromCart } from '../store/cartSlice';
import { Result, Button } from 'antd';


const Cart = () => {
    const dispatch = useAppDispatch();
    const { items, error } = useAppSelector(state => state.cart);
    const navigate = useNavigate();
    const userEmail = useAppSelector(state => state.user?.email);

    useEffect(() => {
        if (userEmail) {
            dispatch(fetchCartItems({ email: userEmail }));
        }
    }, [dispatch, userEmail]);

    // 计算小计
    const calculateSubtotal = () => {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // 运费
    const shipping = 4;

    // 计算总价（含税）
    const calculateTotal = () => {
        return calculateSubtotal() + shipping;
    };

    const handleQuantityUpdate = async (cart_id: number, product_id: number, newQuantity: number) => {
        if (userEmail && newQuantity > 0) {
            await dispatch(updateItemQuantity({
                cart_id,
                product_id,
                quantity: newQuantity,
                email: userEmail
            }));
        }
    };

    const handleRemoveItem = async (cart_id: number, product_id: number) => {
        if (userEmail) {
            await dispatch(removeItemFromCart({
                cart_id,
                product_id,
                email: userEmail
            }));
        }
    };

    if (!userEmail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Result
                    status="warning"
                    title="Please Log In"
                    subTitle="You need to be logged in to view your cart."
                    extra={[
                        <Button 
                            key="login" 
                            type="primary"
                            onClick={() => navigate('/login')}
                            className="bg-pink-500 hover:bg-pink-600"
                        >
                            Log In
                        </Button>
                    ]}
                />
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-gray-50">
            {/* 左侧购物车 */}
            <div className="w-full md:w-1/2 p-6">
                <div className="flex items-center mb-6">
                    <ArrowLeft className="mr-2 text-gray-700 cursor-pointer" onClick={() => navigate(-1)} />
                    <span className="text-xl font-semibold text-gray-700">Shopping Continue</span>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Shopping cart</h2>
                    <p className="text-gray-500 mb-6">You have {items.length} item in your cart</p>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.cart_id} className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                                <img
                                    src={item.image_url}
                                    alt={item.product_name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                                    <p className="text-gray-600 text-sm">{item.category}</p>
                                </div>
                                <div className="flex items-center mx-4">
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => handleQuantityUpdate(item.cart_id, item.product_id, item.quantity + 1)}
                                            className="text-gray-500 hover:text-pink-500"
                                        >
                                            <ChevronUp size={20} />
                                        </button>
                                        <span className="mx-2 text-lg font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityUpdate(item.cart_id, item.product_id, item.quantity - 1)}
                                            className="text-gray-500 hover:text-pink-500"
                                        >
                                            <ChevronDown size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-800 mr-4">
                                    ${item.price.toFixed(2)}
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.cart_id, item.product_id)}
                                    className="text-gray-400 hover:text-pink-500"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 右侧结账区域 */}
            <div className="w-full md:w-1/2 bg-gray-100 p-6 flex items-center justify-center">
                <div className="max-w-md w-full bg-pink-600 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Card Details</h2>

                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-3">Card type</h3>
                        <div className="flex space-x-2">
                            <div className="w-16 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center p-2">
                                <svg viewBox="0 0 38 24" width="100%" height="100%">
                                    <path fill="#FF5F00" d="M22.2,12 L15.8,12 L15.8,3.6 L22.2,3.6 L22.2,12 Z" />
                                    <path fill="#EB001B" d="M16.4,7.8 C16.4,5.9 17.3,4.2 18.7,3.1 C17.5,2.2 16,1.7 14.4,1.7 C10.4,1.7 7.1,4.4 7.1,7.8 C7.1,11.2 10.4,13.9 14.4,13.9 C16,13.9 17.5,13.4 18.7,12.5 C17.3,11.4 16.4,9.7 16.4,7.8 Z" />
                                    <path fill="#F79E1B" d="M30.9,7.8 C30.9,11.2 27.6,13.9 23.6,13.9 C22,13.9 20.5,13.4 19.3,12.5 C20.7,11.4 21.6,9.7 21.6,7.8 C21.6,5.9 20.7,4.2 19.3,3.1 C20.5,2.2 22,1.7 23.6,1.7 C27.6,1.7 30.9,4.4 30.9,7.8 Z" />
                                </svg>
                            </div>
                            <div className="w-16 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center p-2">
                                <svg viewBox="0 0 38 24" width="100%" height="100%">
                                    <rect x="0.5" y="0.5" width="37" height="23" fill="#2566AF" />
                                    <path fill="#FFFFFF" d="M14.5,6 L10,18 L13,18 L14,15.5 L18.5,15.5 L19.5,18 L22.5,18 L18,6 L14.5,6 Z M16.2,9 L17.8,13 L14.8,13 L16.2,9 Z" />
                                    <path fill="#FFFFFF" d="M23,6 L23,18 L25.5,18 L25.5,8.5 L28,13 L30,13 L32.5,8.5 L32.5,18 L35,18 L35,6 L31.5,6 L29,11.5 L26.5,6 L23,6 Z" />
                                </svg>
                            </div>
                            <div className="w-16 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center p-2">
                               <div className="text-black">Visa</div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg mb-2">Name on card</h3>
                        <div className="bg-pink-500 bg-opacity-40 rounded-md p-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-transparent w-full outline-none text-white placeholder-pink-300"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg mb-2">Card Number</h3>
                        <div className="bg-pink-500 bg-opacity-40 rounded-md p-3">
                            <input
                                type="text"
                                placeholder="1111 2222 3333 4444"
                                className="bg-transparent w-full outline-none text-white placeholder-pink-300"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-8">
                        <div className="flex-1">
                            <h3 className="text-lg mb-2">Expiration date</h3>
                            <div className="bg-pink-500 bg-opacity-40 rounded-md p-3">
                                <input
                                    type="text"
                                    placeholder="mm/yy"
                                    className="bg-transparent w-full outline-none text-white placeholder-pink-300"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg mb-2">CVV</h3>
                            <div className="bg-pink-500 bg-opacity-40 rounded-md p-3">
                                <input
                                    type="text"
                                    placeholder="123"
                                    className="bg-transparent w-full outline-none text-white placeholder-pink-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-semibold">${shipping}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total (Tax incl.)</span>
                            <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full bg-pink-400 hover:bg-pink-300 text-white rounded-md py-4 flex justify-between items-center px-6">
                        <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
                        <div className="flex items-center">
                            <span className="mr-2 text-lg">Checkout</span>
                            <ArrowRight size={20} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;