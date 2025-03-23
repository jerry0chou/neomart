import React from 'react'
import clothing from "../assets/clothing.png";
import shirt from "../assets/shirt.png";
import jeans from "../assets/jeans.png";
import bag from "../assets/bag.png";
import bag2 from "../assets/bag2.png";
import bag3 from "../assets/bag3.png";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';

export default function ProductList(){
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const products = [
        { id: 1, name: 'Glorot Paiec', price: '$62.89', image: clothing, tag: 'Top' },
        { id: 2, name: 'Spoort Need Camrt Mono', price: '$71', image: shirt, tag: 'Shirt' },
        { id: 3, name: 'Spoort Product', price: '$69.31', image: jeans, tag: 'Jeans' },
        { id: 4, name: 'Shopping Products', price: '$89.45', image: bag, tag: 'Bag' },
        { id: 5, name: 'Hoord Pielo', price: '$3.30', image: bag2, tag: 'Bag' },
        { id: 6, name: 'Sack', price: '$93.29', image: bag3, tag: 'Bag' }
    ];

    const handleAddToCart = (product: typeof products[0]) => {
        dispatch(addToCart(product));
        messageApi.success({
            content: `${product.name} added to cart`,
            duration: 2,
        });
    };

    return (
        <div>
            {contextHolder}
            <h2 className="text-xl font-bold mb-2">Products</h2>

            <div className="grid grid-cols-3 gap-3">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow">
                        <div className="relative">
                            <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">
                                {product.tag}
                            </div>

                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm mb-1 line-clamp-1 h-[32px]">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700 text-sm font-medium">{product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110"
                                >
                                    <ShoppingCartOutlined style={{ fontSize: '16px' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}