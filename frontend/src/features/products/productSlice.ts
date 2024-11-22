import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsResponse } from '../../types';
import { api } from '../../services/api';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: {
    category: string | null;
    search: string;
    minPrice: number;
    maxPrice: number;
    sort: string;
  };
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    category: null,
    search: '',
    minPrice: 0,
    maxPrice: 10000,
    sort: 'newest',
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setCurrentPage, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
