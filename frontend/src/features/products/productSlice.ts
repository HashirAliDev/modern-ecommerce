import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsResponse, ApiError, RootState } from '../../types';
import axios from 'axios';

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 12,
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  },
  { rejectValue: ApiError }
>('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      params,
    });
    return data;
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
>('products/fetchProductById', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ApiError);
    }
    throw error;
  }
});

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  string,
  { rejectValue: ApiError }
>('products/searchProducts', async (query, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/search`,
      {
        params: { q: query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ApiError);
    }
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
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
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
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
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to search products';
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsTotal = (state: RootState) => state.products.total;

export default productsSlice.reducer;
