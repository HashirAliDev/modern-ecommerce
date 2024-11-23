import axios from 'axios';
import { ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://modern-ecommerce-api.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      statusCode: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductParams {
  skip?: number;
  limit?: number;
  category?: string;
  price?: [number, number];
  rating?: number;
}

// Define the category type
interface Category {
  slug: string;
  name: string;
  url: string;
}

export const getProducts = async (params: ProductParams = {}) => {
  try {
    const { skip = 0, limit = 20, category } = params;
    let url = '/products';

    // If category is provided, use the category-specific endpoint
    if (category) {
      url = `/products/category/${encodeURIComponent(category)}`;
    }

    const response = await api.get<ProductsResponse>(url, {
      params: {
        skip,
        limit,
      },
    });

    return {
      products: response.data.products,
      total: response.data.total,
      skip: response.data.skip,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await api.get('/products/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    // Get products with high ratings and stock
    const response = await api.get('/products', {
      params: {
        limit: 8,
        skip: 0,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export { api };
