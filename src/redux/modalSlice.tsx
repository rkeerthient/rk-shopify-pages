import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalProps {
  isOpen: boolean;
}

const initialState: ModalProps = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.isOpen = isOpen;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
