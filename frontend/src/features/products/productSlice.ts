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
    console.log('Fetching products from:', `${import.meta.env.VITE_API_URL}/products`);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { 
      params,
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return rejectWithValue({ message: 'Request timed out. Please try again.' } as ApiError);
      }
      if (error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      if (error.request) {
        return rejectWithValue({ 
          message: 'No response received from server. Please check your connection.' 
        } as ApiError);
      }
    }
    return rejectWithValue({ 
      message: 'Failed to fetch products. Please try again later.' 
    } as ApiError);
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: ApiError }
>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    console.log('Fetching product by id from:', `${import.meta.env.VITE_API_URL}/products/${id}`);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`, { 
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return rejectWithValue({ message: 'Request timed out. Please try again.' } as ApiError);
      }
      if (error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      if (error.request) {
        return rejectWithValue({ 
          message: 'No response received from server. Please check your connection.' 
        } as ApiError);
      }
    }
    return rejectWithValue({ 
      message: 'Failed to fetch product. Please try again later.' 
    } as ApiError);
  }
});

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  ProductFilters,
  { rejectValue: ApiError }
>('products/searchProducts', async (params, { rejectWithValue }) => {
  try {
    console.log('Searching products from:', `${import.meta.env.VITE_API_URL}/products/search`);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/search`, { 
      params,
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return rejectWithValue({ message: 'Request timed out. Please try again.' } as ApiError);
      }
      if (error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      if (error.request) {
        return rejectWithValue({ 
          message: 'No response received from server. Please check your connection.' 
        } as ApiError);
      }
    }
    return rejectWithValue({ 
      message: 'Failed to search products. Please try again later.' 
    } as ApiError);
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
