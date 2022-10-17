import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interface";

export interface IProductInCart extends IProduct {
  quantity: number;
}

export interface CartState {
  products: IProductInCart[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.products.find(
        (product) => product.product_id === action.payload.product_id
      );
      if (productInCart) {
        productInCart.quantity++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const productInCart = state.products.find(
        (product) => product.product_id === action.payload.product_id
      );
      if (!productInCart) {
        return;
      }
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        const removeProduct = state.products.filter(
          (product) => product.product_id !== action.payload.product_id
        );
        state.products = removeProduct;
      }
    },
    removeAllFromCart: (state, action: PayloadAction<IProduct>) => {
      const removeProduct = state.products.filter(
        (product) => product.product_id !== action.payload.product_id
      );
      state.products = removeProduct;
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions;

export default cartSlice.reducer;
