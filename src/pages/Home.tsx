import React, {useEffect} from 'react';
import { ShoppingCartOutlined} from "@ant-design/icons";
import ProductList from "../components/ProductList.tsx";
import GroupBuying from "../components/GroupBuying.tsx";
import ShoppingCredits from "../components/ShoppingCredits.tsx";
import Search from "../components/Search.tsx";
import Category from "../components/Category.tsx";
import {useNavigate} from "react-router-dom";
import {getHomeList} from "../api/homeApi.ts";
import Cart from "./Cart.tsx";
import { useAppSelector } from '../store/hooks';

const NeoMartPage = () => {
    const navigate = useNavigate()
    const cartItems = useAppSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        const access_token = localStorage.getItem('access_token') || '';
        if(!email || !access_token){
            navigate('/auth');
        }
        getHomeList()
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-44 bg-pink-100 p-4">
                    <Category/>
                    <div className="mb-6 bg-gradient-to-br from-pink-200 to-pink-100 rounded-lg p-4">
                        <div className="text-center font-bold mb-2">LOYALTY</div>
                        <div className="text-sm">Exclusive Deals Offered</div>
                        <div className="text-xs text-gray-600">Shopping History</div>
                        <div className="flex justify-center mt-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-pink-500">$</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-lg p-4">
                        <div className="text-center font-bold mb-2">EXLUSATES</div>
                        <div className="text-sm">Loyalty Deals Offered</div>
                        <div className="text-xs text-gray-600">Shopping History</div>
                        <div className="flex justify-center mt-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-pink-500">$</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4">
                    {/* Search Bar */}
                    <div className="flex justify-center items-center mb-6">
                        <Search/>
                        <div className="ml-4 relative cursor-pointer" onClick={()=> navigate('cart')}>
                            <ShoppingCartOutlined className="text-4xl"/>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row gap-4">
                        {/* Products Section */}
                        <ProductList />
                        <div className="flex flex-col">
                            <GroupBuying/>
                            <ShoppingCredits/>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default NeoMartPage;