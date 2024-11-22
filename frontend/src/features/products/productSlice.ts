import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, searchProducts, getFeaturedProducts, getProduct } from '../../services/api';

interface ProductState {
  products: any[];
  featuredProducts: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalProducts: number;
  itemsPerPage: number;
  filters: {
    category?: string;
    price?: [number, number];
    rating?: number;
  };
  searchQuery: string;
  searchResults: any[];
  searchLoading: boolean;
  searchError: string | null;
  currentProduct: any | null;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalProducts: 0,
  itemsPerPage: 20,
  filters: {},
  searchQuery: '',
  searchResults: [],
  searchLoading: false,
  searchError: null,
  currentProduct: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { products: ProductState };
      const { currentPage, itemsPerPage, filters } = state.products;
      console.log('Fetching products with filters:', filters); // Debug log
      const response = await getProducts({
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        ...filters,
      });
      return response;
    } catch (error) {
      console.error('Error in fetchProducts:', error); // Debug log
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await getProduct(productId);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch product details');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeaturedProducts();
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch featured products');
    }
  }
);

export const searchProductsAsync = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await searchProducts(query);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to search products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
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
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchProductsAsync.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.products;
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload as string;
      });
  },
});

export const {
  setCurrentPage,
  setFilters,
  clearFilters,
  setSearchQuery,
  clearSearchResults,
  clearCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;
