import { store } from '../app/store';

// Redux Store Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  brand: string;
  discountPercentage?: number;
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
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
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemsCount: number;
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

// Order Types
export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

// Filter Types
export interface FilterState {
  category: string;
  priceRange: [number, number];
  sort: string;
  search: string;
}

// API Types
export interface ApiError {
  message: string;
  status: number;
}

// Async Thunk Types
export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  rejectValue: ApiError;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}
