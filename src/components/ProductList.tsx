import React from 'react'
import clothing from "../assets/clothing.png";
import shirt from "../assets/shirt.png";
import jeans from "../assets/jeans.png";
import bag from "../assets/bag.png";
import bag2 from "../assets/bag2.png";
import bag3 from "../assets/bag3.png";

export default function ProductList(){
    const products = [
        { id: 1, name: 'Glorot Paiec', price: '$62.89', image: clothing, tag: 'Top' },
        { id: 2, name: 'Spoort Need Camrt Mono', price: '$71', image: shirt, tag: 'Shirt' },
        { id: 3, name: 'Spoort Product', price: '$69.31', image: jeans, tag: 'Jeans' },
        { id: 4, name: 'Shopping Products', price: '$89.45', image: bag, tag: 'Bag' },
        { id: 5, name: 'Hoord Pielo', price: '$3.30', image: bag2, tag: 'Bag' },
        { id: 6, name: 'Sack', price: '$93.29', image: bag3, tag: 'Bag' }
    ];
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Products</h2>

            <div className="grid grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow">
                        <div className="relative">
                            <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">
                                {product.tag}
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
    )
}