import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface ProductParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  limit?: number;
  skip?: number;
  offset?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

export interface CheckoutState {
  order: Order | null;
  loading: boolean;
  error: string | null;
  step: number;
}

export interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductState;
  checkout: CheckoutState;
}
