import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { getCategories, Category as CategoryType } from '../api/homeApi';

interface CategoryProps {
    onCategorySelect: (categoryId: string) => void;
    selectedCategory: string;
}

export default function Category({ onCategorySelect, selectedCategory }: CategoryProps) {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId: string) => {
        onCategorySelect(categoryId);
    };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <span className="text-lg font-semibold text-gray-800">
                    Categories
                </span>
            ),
            children: (
                <div className="py-2">
                    <div
                        key="all"
                        className={`flex items-center py-2 px-4 cursor-pointer transition-colors ${
                            selectedCategory === 'all' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                        }`}
                        onClick={() => handleCategoryClick('all')}
                    >
                        <span>All Categories</span>
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center py-2 px-4 cursor-pointer transition-colors ${
                                selectedCategory === String(category.id) ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                            }`}
                            onClick={() => handleCategoryClick(String(category.id))}
                        >
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            ),
        }
    ];

    return (
        <div className="bg-pink-100 rounded-lg">
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