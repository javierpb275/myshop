import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interface";

export interface IProductInCart extends IProduct {
  quantity: number;
}

export interface CartState {
  cart: IProductInCart[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.cart.find(
        (product) => product.product_id === action.payload.product_id
      );
      if (productInCart) {
        productInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.cart.find(
        (product) => product.product_id === action.payload.product_id
      );
      if (!productInCart) {
        return;
      }
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        const removeProduct = state.cart.filter(
          (product) => product.product_id !== action.payload.product_id
        );
        state.cart = removeProduct;
      }
    },
    removeAllFromCart: (state, action: PayloadAction<IProduct>) => {
      const removeProduct = state.cart.filter(
        (product) => product.product_id !== action.payload.product_id
      );
      state.cart = removeProduct;
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions;

export default cartSlice.reducer;
