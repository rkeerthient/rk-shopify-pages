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
  isLoading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    setInitialCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { clearCart, addToCart, removeFromCart, setInitialCart } =
  cartSlice.actions;
export default cartSlice.reducer;
