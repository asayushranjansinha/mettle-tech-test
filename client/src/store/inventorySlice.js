import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateInventory: (state, action) => {
      state.items = action.payload;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { updateInventory, deleteProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
