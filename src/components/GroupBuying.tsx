import React from "react";

export default function GroupBuying(){
    return (
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
    )
}