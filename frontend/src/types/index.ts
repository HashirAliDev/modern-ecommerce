import { store } from '../app/store';

// Redux Store Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// API Types
export interface ApiError {
  message: string;
  statusCode: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: Review[];
  images: string[];
  discountPercentage?: number;
  thumbnail: string;
  title: string; // Alias for name, for compatibility
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Cart Types
export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  image?: string; // Alias for imageUrl, for compatibility
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Review Types
export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Order Types
export interface OrderItem extends CartItem {
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

// Address Types
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

// Filter Types
export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

// Redux Store Type
export interface RootState {
  products: {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
    currentProduct: Product | null;
  };
  cart: CartState;
  auth: AuthState;
}
