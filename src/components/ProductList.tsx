import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, ReloadOutlined } from "@ant-design/icons";
import { message, Result, Button, Card, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addItemToCart } from '../store/cartSlice';
import { getHomeList, getCategories, Product, Category, searchProducts } from '../api/homeApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GroupBuyDialog from './GroupBuyDialog';

interface ProductListProps {
    selectedCategory: string;
}

export default function ProductList({ selectedCategory }: ProductListProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const userEmail = useAppSelector(state => state.user?.email);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const searchQuery = searchParams.get('q');
            if (searchQuery) {
                const searchResults = await searchProducts(searchQuery);
                setProducts(searchResults);
            } else {
                const products = await getHomeList(selectedCategory);
                setProducts(products);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
            setError(errorMessage);
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [selectedCategory, searchParams]);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation(); // Prevent navigation when clicking the cart button
        
        if (!userEmail) {
            messageApi.warning({
                content: 'Please log in to add items to cart',
                duration: 2,
            });
            return;
        }

        dispatch(addItemToCart({
            product_id: product.id,
            quantity: 1,
            email: userEmail
        }));
        messageApi.success({
            content: `${product.name} added to cart`,
            duration: 2,
        });
    };

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to load products"
                subTitle={error}
                extra={[
                    <Button 
                        key="retry" 
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={() => fetchProducts()}
                    >
                        Try Again
                    </Button>
                ]}
            />
        );
    }

    const ProductSkeleton = () => (
        <Card className="h-full">
            <Skeleton.Image className="w-full h-48" active />
            <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
    );

    return (
        <div className="flex-1">
            {contextHolder}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[400px]">
                {loading ? (
                    Array(6).fill(null).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                ) : products.length > 0 ? (
                    products.map(product => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="relative">
                                <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">
                                    {categories.find(c => c.id === product.category_id)?.name || String(product.category_id)}
                                </div>

                                <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm mb-1 line-clamp-1 h-[32px]">{product.name}</h3>
                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-700 text-sm font-medium">${product.price.toFixed(2)}</p>
                                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <GroupBuyDialog 
                                            productId={product.id} 
                                            productName={product.name}
                                            variant="list"
                                        />
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110"
                                        >
                                            <ShoppingCartOutlined style={{ fontSize: '16px' }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        <Result
                            status="info"
                            title="No Products Found"
                            subTitle="Try adjusting your search or filter criteria."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}