import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemsCount: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  itemsCount: 0,
  total: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);

      if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity = Math.min(
          existingItem.quantity + item.quantity,
          existingItem.stock
        );
      } else {
        // Add new item
        state.items.push(item);
      }

      // Update cart totals
      state.itemsCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        itemsCount: state.itemsCount,
        total: state.total
      }));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      
      // Update cart totals
      state.itemsCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        itemsCount: state.itemsCount,
        total: state.total
      }));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);

      if (item) {
        item.quantity = Math.min(Math.max(1, quantity), item.stock);

        // Update cart totals
        state.itemsCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          itemsCount: state.itemsCount,
          total: state.total
        }));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemsCount = 0;
      state.total = 0;
      localStorage.removeItem('cart');
    },
    loadCart: (state) => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const { items, itemsCount, total } = JSON.parse(cart);
        state.items = items;
        state.itemsCount = itemsCount;
        state.total = total;
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCart
} = cartSlice.actions;

export default cartSlice.reducer;
