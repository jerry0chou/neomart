import React, { useState } from 'react';
import {DownOutlined, ShoppingCartOutlined} from "@ant-design/icons";

const MoreIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);


const NeoMartPage = () => {
    const [categoryOpen, setCategoryOpen] = useState(false);

    const categories = [
        'Electronics',
        'Wrlit font',
        'Estorl',
        'Fashion',
        'Fashion',
        'Home & Kitchen',
        'Beauty',
        'Beauty & Health'
    ];

    const products = [
        { id: 1, name: 'Glorot Paiec', price: '$62.89', image: '/api/placeholder/250/300', tag: 'GEN' },
        { id: 2, name: 'Spoort Need Camrt Mono', price: '$71', image: '/api/placeholder/250/300', tag: 'GEN' },
        { id: 3, name: 'Spoort Product', price: '$69.31', image: '/api/placeholder/250/300', tag: 'GEN' },
        { id: 4, name: 'Shopping Products', price: '$89.45', image: '/api/placeholder/250/300', tag: 'GEN' },
        { id: 5, name: 'Hoord Pielo', price: '$3.30', image: '/api/placeholder/250/300', tag: 'GEN' },
        { id: 6, name: 'Sack', price: '$93.29', image: '/api/placeholder/250/300', tag: 'GEN' }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-pink-100 p-4">
                    <div className="mb-6">
                        <div
                            className="flex items-center justify-between font-semibold p-2 border-b border-gray-300 cursor-pointer"
                            onClick={() => setCategoryOpen(!categoryOpen)}
                        >
                            <span>Category</span>
                            <DownOutlined className="text-sm"/>
                        </div>

                        {categoryOpen && (
                            <ul className="mt-2">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-pink-200 border-b border-gray-200 cursor-pointer"
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

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
                        <div className="w-full max-w-3xl relative">
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="w-full py-2 px-4 rounded-full bg-pink-500 text-white placeholder-white"
                            />
                        </div>
                        <div className="ml-4 relative">
                            <ShoppingCartOutlined className="text-4xl"/>
                            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Products</h2>

                        <div className="grid grid-cols-3 gap-6">
                            {products.map(product => (
                                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow">
                                    <div className="relative">
                                        <div className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                                            {product.tag}
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <MoreIcon size={20} />
                                        </div>
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-gray-700">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Group Buying Section */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-2/3">
                                <h2 className="text-2xl font-bold mb-4">Group Buying Discounts</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Invite friend friends to purchase the same item, when 10% of people participate.
                                </p>

                                <div className="flex space-x-4 mb-4">
                                    <button className="bg-pink-100 px-4 py-2 rounded flex items-center">
                                        <span className="mr-2">Invitation</span>
                                    </button>
                                    <button className="bg-pink-100 px-4 py-2 rounded flex items-center">
                                        <span className="mr-2">Discount</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-1">
                                        <span>50%</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-1">
                                        <span>50%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-end">
                            <div className="text-xs">Invitater</div>
                            <div className="flex space-x-4">
                                <button className="px-4 py-1 border border-gray-300 rounded text-sm">
                                    1.50%
                                </button>
                                <button className="px-4 py-1 border border-gray-300 rounded text-sm">
                                    4.00%
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Shopping Credits */}
                    <div className="mt-8 bg-pink-100 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Shopping Credits</h2>

                        <div className="flex justify-between mb-4">
                            <div>Price</div>
                            <div>Filter</div>
                        </div>

                        <div className="bg-white rounded-full p-2 flex items-center mb-6">
                            <span className="ml-2">Search</span>
                            <div className="ml-auto flex items-center">
                                <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-gray-600 rounded-full ml-auto"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="bg-white text-black font-semibold py-2 px-8 rounded-full">
                                Checkout
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NeoMartPage;