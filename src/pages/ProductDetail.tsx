import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail, getProductDetail } from '../api/productApi';
import { Spin, Result, Button, message, Tag, Tooltip, Badge, Rate } from 'antd';
import { 
    ArrowLeftOutlined, 
    ShoppingCartOutlined, 
    HeartOutlined, 
    ShareAltOutlined,
    SafetyCertificateOutlined,
    RocketOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addItemToCart } from '../store/cartSlice';
import GroupBuyDialog from '../components/GroupBuyDialog';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userEmail = useAppSelector(state => state.user?.email);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError('Invalid product ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await getProductDetail(parseInt(productId));
                setProduct(data);
            } catch (err) {
                setError('Failed to load product details');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;

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
            content: (
                <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2" />
                    {product.name} has been added to cart
                </div>
            ),
            duration: 2,
        });
    };

    const benefits = [
        { icon: <SafetyCertificateOutlined />, text: '100% Authentic' },
        { icon: <RocketOutlined />, text: 'Fast Shipping' },
        { icon: <ClockCircleOutlined />, text: '24/7 Support' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <Result
                status="error"
                title="Failed to load product"
                subTitle={error || "Product not found"}
                extra={[
                    <Button 
                        key="back" 
                        type="primary"
                        onClick={() => navigate('/')}
                        className="bg-pink-500 hover:bg-pink-600"
                    >
                        Back to Home
                    </Button>
                ]}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {contextHolder}
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-pink-500 mb-6 transition-colors"
            >
                <ArrowLeftOutlined className="mr-2" />
                Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="w-full max-w-lg mx-auto">
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-white">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                            }}
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    
                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-pink-500">
                            ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                        </span>
                        <Tag color="pink">Free Shipping</Tag>
                        {product.stock > 0 && <Tag color="green">In Stock</Tag>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Rate disabled defaultValue={product.average_rating || 0} className="text-pink-500" />
                        <span className="text-gray-500">({product.review_count || 0} reviews)</span>
                    </div>

                    {/* Benefits Section */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <span className="text-2xl text-pink-500 mb-2">{benefit.icon}</span>
                                <span className="text-sm text-gray-600">{benefit.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Category</span>
                                    <p className="text-gray-600">{product.category_name}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Stock</span>
                                    <p className="text-gray-600">{product.stock || 0} units</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Seller</span>
                                    <p className="text-gray-600">{product.seller_name}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Added</span>
                                    <p className="text-gray-600">{new Date(product.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleAddToCart}
                            disabled={!product.stock}
                            className={`w-full flex items-center justify-center text-white py-3 px-6 rounded-lg transition-colors ${
                                product.stock 
                                    ? 'bg-pink-500 hover:bg-pink-600' 
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ShoppingCartOutlined className="mr-2" />
                            {product.stock ? 'Add to Cart' : 'Out of Stock'}
                        </button>

                        {/* <GroupBuyDialog 
                            productId={product.id} 
                            productName={product.name}
                        /> */}
                    </div>

                    {/* Additional Features */}
                    <div className="bg-pink-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Shipping & Returns</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-600">
                                <CheckCircleOutlined className="text-green-500 mr-2" />
                                30-day return policy
                            </li>
                            <li className="flex items-center text-gray-600">
                                <CheckCircleOutlined className="text-green-500 mr-2" />
                                Secure payment
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage; 