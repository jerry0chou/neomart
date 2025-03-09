import React from "react";
export default function ShoppingCredits(){
    return (
        <div className="mt-6 bg-pink-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Shopping Credits</h2>

            <div className="flex justify-between mb-4">
                <div>Price</div>
                <div>Filter</div>
            </div>

            <div className="bg-white rounded-full p-2 flex items-center mb-8">
                <span className="ml-2">Search</span>
                <div className="ml-auto flex items-center">
                    <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-gray-600 rounded-full ml-auto"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-4">
                <button className="bg-white text-black font-semibold py-2 px-8 rounded-full">
                    Checkout
                </button>
            </div>
        </div>
    )
}