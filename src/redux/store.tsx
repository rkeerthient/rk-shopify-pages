import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import shopifyCartSlice from "./shopifyCartSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    shopify: shopifyCartSlice,
    modal: modalSlice,
  },
});

export default store;
