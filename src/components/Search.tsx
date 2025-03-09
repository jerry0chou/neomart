import React from "react";

export default function Search() {
    return (
        <div className="w-full max-w-xl relative">
            <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 rounded-full bg-pink-500 text-white placeholder-gray-200"
            />
        </div>
    )
}