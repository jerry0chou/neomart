import http from './http';

export interface ProductDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    seller_id: number;
    category_id: number;
    category_name: string;
    created_at: string;
    seller_name: string;
    average_rating: number;
    review_count: number;
}

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
    const response = await http.get(`/product/${productId}`);
    return response.data;
}; 