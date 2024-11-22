import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
}

interface CheckoutState {
  step: number;
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  loading: boolean;
  error: string | null;
  orderId: string | null;
}

const initialState: CheckoutState = {
  step: 1,
  shippingAddress: null,
  paymentMethod: null,
  loading: false,
  error: null,
  orderId: null,
};

export const createPaymentIntent = createAsyncThunk(
  'checkout/createPaymentIntent',
  async (amount: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/create-payment-intent`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create payment intent'
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  'checkout/createOrder',
  async (
    orderData: {
      items: any[];
      shippingAddress: ShippingAddress;
      paymentMethod: PaymentMethod;
      totalAmount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create order'
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    resetCheckout: (state) => {
      state.step = 1;
      state.shippingAddress = null;
      state.paymentMethod = null;
      state.orderId = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Payment Intent
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orderId = action.payload.order._id;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setStep,
  setShippingAddress,
  setPaymentMethod,
  resetCheckout,
  clearError,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
