import React, {useState} from "react";
import {DownOutlined} from "@ant-design/icons";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

export default function Category(){
    const categories = [
        { name: 'Electronics', count: 128 },
        { name: 'Fashion', count: 256 },
        { name: 'Home & Kitchen', count: 189 },
        { name: 'Beauty & Health', count: 145 },
        { name: 'Sports & Outdoors', count: 92 },
        { name: 'Books', count: 167 },
        { name: 'Toys & Games', count: 83 },
        { name: 'Jewelry', count: 76 }
    ];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <span className="text-base font-medium text-gray-800">
                    Categories
                </span>
            ),
            children: (
                <div className="py-1">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2.5 px-3 hover:bg-white/50 cursor-pointer transition-colors group"
                        >
                            <span className="text-gray-700 group-hover:text-pink-600">
                                {category.name}
                            </span>
                            <span className="text-xs text-gray-500 bg-white/60 px-2.5 py-1 rounded-full group-hover:bg-white group-hover:text-pink-600">
                                {category.count}
                            </span>
                        </div>
                    ))}
                </div>
            ),
        }
    ];

    return (
        <div className="bg-gradient-to-b from-pink-100/80 to-pink-50/80 rounded-lg">
            <Collapse
                defaultActiveKey={['1']}
                ghost
                expandIconPosition="end"
                items={items}
                className="category-collapse"
            />
        </div>
    );
}