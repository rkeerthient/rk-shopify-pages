import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ShopifyState {
  cartId: string;
  checkoutUrl: string;
}

const initialState: ShopifyState = {
  cartId: "",
  checkoutUrl: "",
};

const shopifyCartSlice = createSlice({
  name: "shopifyCart",
  initialState,
  reducers: {
    addCartDetails: (
      state,
      action: PayloadAction<{ cartId: string; checkoutUrl: string }>
    ) => {
      const { cartId, checkoutUrl } = action.payload;
      state.cartId = cartId;
      state.checkoutUrl = checkoutUrl;
    },
  },
});

export const { addCartDetails } = shopifyCartSlice.actions;
export default shopifyCartSlice.reducer;
