import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import shopifyCartSlice from "./shopifyCartSlice";

// Define and export the store variable
const store = configureStore({
  reducer: {
    cart: cartSlice,
    shopify: shopifyCartSlice,
  },
});

export default store;
