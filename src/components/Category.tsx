import React, {useState} from "react";
import {DownOutlined} from "@ant-design/icons";

export default function Category(){
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
    return (
        <div className="mb-4">
            <div
                className="flex items-center justify-between font-semibold p-1 border-b border-gray-300 cursor-pointer"
                onClick={() => setCategoryOpen(!categoryOpen)}
            >
                <span>Category</span>
                <DownOutlined className="text-sm"/>
            </div>

            {categoryOpen && (
                <ul className="mt-1">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="p-1 hover:bg-pink-200 border-b border-gray-200 cursor-pointer text-sm"
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}