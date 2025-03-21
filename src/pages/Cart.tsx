import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Trash2, ArrowRight } from 'lucide-react';
import {useNavigate} from "react-router-dom";
const Cart = () => {
    // 初始商品数据
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Italy Pizza",
            description: "Extra cheese and toping",
            price: 681,
            quantity: 1,
            image: "/api/placeholder/150/150"
        },
        {
            id: 2,
            name: "Combo Plate",
            description: "Extra cheese and toping",
            price: 681,
            quantity: 1,
            image: "/api/placeholder/150/150"
        },
        {
            id: 3,
            name: "Spanish Rice",
            description: "Extra garlic",
            price: 681,
            quantity: 1,
            image: "/api/placeholder/150/150"
        }
    ]);

    // 增加商品数量
    const increaseQuantity = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // 减少商品数量
    const decreaseQuantity = (id: number) => {
        setItems(items.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // 移除商品
    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // 计算小计
    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // 运费
    const shipping = 4;

    // 计算总价（含税）
    const calculateTotal = () => {
        return calculateSubtotal() + shipping;
    };
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-gray-50">
            {/* 左侧购物车 */}
            <div className="w-full md:w-1/2 p-6">
                <div className="flex items-center mb-6">
                    <ArrowLeft className="mr-2 text-gray-700" onClick={()=> navigate(-1)}/>
                    <span className="text-xl font-semibold text-gray-700">Shopping Continue</span>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Shopping cart</h2>
                    <p className="text-gray-500 mb-6">You have {items.length} item in your cart</p>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                                <div className="flex items-center mx-4">
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="text-gray-500 hover:text-pink-500"
                                        >
                                            <ChevronUp size={20} />
                                        </button>
                                        <span className="mx-2 text-lg font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="text-gray-500 hover:text-pink-500"
                                        >
                                            <ChevronDown size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-gray-800 mr-4">
                                    ${item.price}
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
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
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                            <img src="/api/placeholder/48/48" alt="User" className="w-full h-full object-cover" />
                        </div>
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
                                <svg viewBox="0 0 38 24" width="100%" height="100%">
                                    <path fill="#1A1876" d="M35,2.4 C35,1.1 33.9,0 32.6,0 L5.4,0 C4.1,0 3,1.1 3,2.4 L3,21.6 C3,22.9 4.1,24 5.4,24 L32.6,24 C33.9,24 35,22.9 35,21.6 L35,2.4 Z" />
                                    <path fill="#6C69B9" d="M14.5,7 C14.4,8.3 13.5,9.3 12.2,9.3 C10.9,9.3 10,8.3 10.1,7 C10.2,5.7 11.1,4.7 12.4,4.7 C13.7,4.7 14.6,5.7 14.5,7 Z M11.8,10.8 L14.2,10.8 L14.2,19.3 L11.8,19.3 L11.8,10.8 Z M18.2,10.8 L20.6,10.8 L20.6,12 C21.1,11.2 22.1,10.6 23.2,10.6 C25.4,10.6 27,12.2 27,14.7 C27,17.2 25.4,18.8 23.2,18.8 C22.1,18.8 21.1,18.2 20.6,17.4 L20.6,19.3 L18.2,19.3 L18.2,10.8 Z M22.5,12.7 C21.3,12.7 20.5,13.5 20.5,14.7 C20.5,15.9 21.3,16.7 22.5,16.7 C23.7,16.7 24.5,15.9 24.5,14.7 C24.5,13.5 23.7,12.7 22.5,12.7 Z" />
                                </svg>
                            </div>
                            <div className="w-16 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center p-2">
                                <svg viewBox="0 0 38 24" width="100%" height="100%">
                                    <rect x="0.5" y="0.5" width="37" height="23" fill="#016FD0" />
                                    <path fill="#FFFFFF" d="M19,15.7 L17.1,8.3 L14.5,8.3 L14.5,8.3 L14.5,8.3 L14.5,8.3 L14.5,8.3 L13.7,13.3 C13.7,13.6 13.4,13.9 13.1,13.9 L10.5,13.9 L10.4,14.3 L13.7,14.3 C14.1,14.3 14.4,14 14.5,13.6 L15.1,10 L15.1,10 L16.4,15.7 L19,15.7 Z" />
                                    <path fill="#FFFFFF" d="M27.2,11.9 L28.2,9.1 L28.9,11.9 L27.2,11.9 Z M30.8,15.7 L29.8,12.5 L31.7,12.5 L31.7,11.3 L29.5,11.3 L29,9.9 L28.9,9.9 L29.5,11.3 L27.1,11.3 L27.1,12.5 L29.1,12.5 L28.3,15.7 L30.8,15.7 Z" />
                                    <path fill="#FFFFFF" d="M25.6,13.3 C25.6,13 25.8,12.7 26.1,12.7 C26.4,12.7 26.6,12.4 26.6,12.1 L26.6,8.3 L24.6,8.3 L24.6,8.3 L24.6,8.3 L24.6,8.3 L24.6,8.3 L24.6,8.3 L23.8,13.3 C23.8,13.6 23.5,13.9 23.2,13.9 L20.9,13.9 L20.8,14.3 L24,14.3 C24.4,14.3 24.7,14 24.8,13.6 L25.6,8.7 L26.6,8.7 L26.6,11.9 C26.6,12.5 26.1,13 25.5,13 C25.2,13 24.9,13.1 24.8,13.3 L25.6,13.3 Z" />
                                </svg>
                            </div>
                            <div className="w-16 h-12 bg-white bg-opacity-20 rounded-md flex items-center justify-center">
                                <span className="text-sm">See all</span>
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
                            <span className="font-semibold">${calculateSubtotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-semibold">${shipping}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total (Tax incl.)</span>
                            <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>

                    <button className="w-full bg-pink-400 hover:bg-pink-300 text-white rounded-md py-4 flex justify-between items-center px-6">
                        <span className="text-xl font-bold">${calculateTotal().toLocaleString()}</span>
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