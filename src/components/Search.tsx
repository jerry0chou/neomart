import React from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function Search() {
    return (
        <div className="w-full max-w-xl relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-3 pl-12 pr-4 rounded-full bg-white border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all text-gray-700 placeholder-gray-400"
                />
                <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-lg" />
            </div>
        </div>
    )
}