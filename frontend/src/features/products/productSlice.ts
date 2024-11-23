import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsResponse, ApiError, ProductFilters, RootState } from '../../types';
import axios from 'axios';

interface ProductState {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  currentProduct: null,
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  ProductFilters,
  { rejectValue: ApiError }
>('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ApiError);
    }
    throw error;
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: ApiError }
>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ApiError);
    }
    throw error;
  }
});

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  ProductFilters,
  { rejectValue: ApiError }
>('products/searchProducts', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/search`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ApiError);
    }
    throw error;
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch product';
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to search products';
      });
  },
});

export const selectProducts = (state: RootState) => state.products.items;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsTotal = (state: RootState) => state.products.total;

export default productSlice.reducer;
