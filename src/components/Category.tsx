import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { getCategories, Category as CategoryType } from '../api/homeApi';

interface CategoryProps {
    onCategorySelect?: (categoryId: string) => void;
}

export default function Category({ onCategorySelect }: CategoryProps) {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
        setSelectedCategory(categoryId);
        onCategorySelect?.(categoryId);
    };

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
                    <div
                        key="all"
                        className={`flex items-center justify-between py-2.5 px-3 hover:bg-white/50 cursor-pointer transition-colors group ${
                            selectedCategory === 'all' ? 'bg-white/50 text-pink-600' : ''
                        }`}
                        onClick={() => handleCategoryClick('all')}
                    >
                        <span className={`${selectedCategory === 'all' ? 'text-pink-600' : 'text-gray-700'} group-hover:text-pink-600`}>
                            All Categories
                        </span>
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center justify-between py-2.5 px-3 hover:bg-white/50 cursor-pointer transition-colors group ${
                                selectedCategory === String(category.id) ? 'bg-white/50 text-pink-600' : ''
                            }`}
                            onClick={() => handleCategoryClick(String(category.id))}
                        >
                            <span className={`${selectedCategory === String(category.id) ? 'text-pink-600' : 'text-gray-700'} group-hover:text-pink-600`}>
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            ),
        }
    ];

    return (
        <div className="bg-gradient-to-b from-pink-200/100 to-pink-100/100 rounded-lg">
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