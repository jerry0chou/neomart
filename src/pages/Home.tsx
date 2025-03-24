import React, {useEffect, useState} from 'react';
import { ShoppingCartOutlined, CreditCardOutlined, TeamOutlined } from "@ant-design/icons";
import ProductList from "../components/ProductList.tsx";
import GroupBuying from "../components/GroupBuying.tsx";
import ShoppingCredits from "../components/ShoppingCredits.tsx";
import Search from "../components/Search.tsx";
import Category from "../components/Category.tsx";
import {useNavigate} from "react-router-dom";
import {getHomeList} from "../api/homeApi.ts";
import Cart from "./Cart.tsx";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Modal } from 'antd';
import { setUser } from '../store/authSlice';

const NeoMartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isCreditsModalVisible, setIsCreditsModalVisible] = useState(false);
    const [isGroupBuyingModalVisible, setIsGroupBuyingModalVisible] = useState(false);
    const cartItems = useAppSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        const access_token = localStorage.getItem('access_token') || '';
        if(!email || !access_token){
            navigate('/auth');
        } else {
            // Set user data from localStorage
            dispatch(setUser({
                name: email.split('@')[0], // Use email prefix as name for now
                email: email
            }));
        }
        getHomeList()
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-44 bg-pink-100 p-4">
                    <Category/>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4">
                    {/* Search Bar and Quick Access */}
                    <div className="flex justify-center items-center mb-6">
                        <div className="flex-1 max-w-xl">
                            <Search/>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                            <div 
                                className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => setIsCreditsModalVisible(true)}
                            >
                                <div className="flex items-center">
                                    <CreditCardOutlined className="text-xl mr-2 text-pink-600" />
                                    <span className="font-medium">Credits</span>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow text-white hover:from-pink-600 hover:to-rose-500"
                                onClick={() => setIsGroupBuyingModalVisible(true)}
                            >
                                <div className="flex items-center">
                                    <TeamOutlined className="text-xl mr-2" />
                                    <span className="font-medium">Group Buy</span>
                                </div>
                            </div>

                            <div 
                                className="relative cursor-pointer" 
                                onClick={()=> navigate('cart')}
                            >
                                <ShoppingCartOutlined className="text-3xl text-gray-700 hover:text-pink-500 transition-colors"/>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <ProductList />

                    {/* Modals */}
                    <Modal
                        title="Shopping Credits"
                        open={isCreditsModalVisible}
                        onCancel={() => setIsCreditsModalVisible(false)}
                        footer={null}
                        width={600}
                    >
                        <ShoppingCredits />
                    </Modal>

                    <Modal
                        title="Group Buying"
                        open={isGroupBuyingModalVisible}
                        onCancel={() => setIsGroupBuyingModalVisible(false)}
                        footer={null}
                        width={600}
                    >
                        <GroupBuying />
                    </Modal>
                </main>
            </div>
        </div>
    );
};

export default NeoMartPage;