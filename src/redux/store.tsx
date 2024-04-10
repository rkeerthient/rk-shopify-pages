import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
});

export default store;
