import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

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
    let url = `${API_BASE_URL}/products`;

    // If category is provided, use the category-specific endpoint
    if (category) {
      url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`;
    }

    const response = await axios.get<ProductsResponse>(url, {
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
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/search`, {
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
    const response = await axios.get<Category[]>(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    // Get products with high ratings and stock
    const response = await axios.get(`${API_BASE_URL}/products`, {
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
