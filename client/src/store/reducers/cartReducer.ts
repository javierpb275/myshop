import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interface";

export interface CartState {
  cart: IProduct[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {},
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
