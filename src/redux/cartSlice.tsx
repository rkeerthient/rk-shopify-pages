import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

// Function to load state from local storage
function loadCart() {
  if (typeof window !== "undefined" && localStorage.getItem("localCart")) {
    return JSON.parse(localStorage.getItem("localCart")!);
  }
  return [];
}

const initialState: CartState = {
  cartItems: loadCart(),
  total: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        state.total -= item.amount * item.quantity;
      }
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.total += action.payload.amount * action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload });
        state.total += action.payload.amount * action.payload.quantity;
      }
    },
  },
});

export const { clearCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
