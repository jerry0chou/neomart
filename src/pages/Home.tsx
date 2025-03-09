import React from 'react';
import { ShoppingCartOutlined} from "@ant-design/icons";
import ProductList from "../components/ProductList.tsx";
import GroupBuying from "../components/GroupBuying.tsx";
import ShoppingCredits from "../components/ShoppingCredits.tsx";
import Search from "../components/Search.tsx";
import Category from "../components/Category.tsx";

const NeoMartPage = () => {


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-pink-100 p-4">
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
                        <div className="ml-4 relative">
                            <ShoppingCartOutlined className="text-4xl"/>
                            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                        </div>
                    </div>

                    {/* Products Section */}
                    <ProductList />

                    {/* Group Buying Section */}
                    <GroupBuying/>

                    {/* Shopping Credits */}
                    <ShoppingCredits/>
                </main>
            </div>
        </div>
    );
};

export default NeoMartPage;