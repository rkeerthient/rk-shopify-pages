import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  colorFamily?: string;
  colorName?: string;
  amount: number;
}

export interface CartState {
  cartItems: CartItem[];
  total: number;
  isLoading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const { clearCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
