import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      state.cart.push(payload);
    },
    removeItem(state, action) {
      const filteredItems = state.cart.filter(
        (item) => item.pizzaId !== action.payload,
      );

      state.cart = filteredItems;
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item.quantity === 1) {
        cartSlice.caseReducers.removeItem(state, action);
      }

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;

// This is called a Redux Selector function.
// They should start with 'get' as a convention
export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
