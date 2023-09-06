import { createSlice } from "@reduxjs/toolkit";

export type GlobalLoginState = {
  value: boolean;
};

const initialState = {
  value: false,
};

export const globalLoginSlice = createSlice({
  name: "globalLogin",
  initialState,
  reducers: {
    showLoginModal: (state) => {
      state.value = true;
    },
    closeLoginModal: (state) => {
      state.value = false;
    },
  },
});

export const { showLoginModal, closeLoginModal } = globalLoginSlice.actions;

export default globalLoginSlice.reducer;
