// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { plantId: { id, name, price, quantity, thumbnail } }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: 1 };
      } else {
        state.items[plant.id].quantity += 1;
      }
      state.totalQuantity += 1;
      state.totalPrice += plant.price;
    },
    addMany(state, action) {
      const { plant, quantity } = action.payload;
      const qty = Number(quantity) || 1;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: qty };
      } else {
        state.items[plant.id].quantity += qty;
      }
      state.totalQuantity += qty;
      state.totalPrice += plant.price * qty;
    },
    increaseItem(state, action) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += state.items[id].price;
      }
    },
    decreaseItem(state, action) {
      const id = action.payload;
      if (state.items[id] && state.items[id].quantity > 1) {
        state.items[id].quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= state.items[id].price;
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      if (state.items[id]) {
        state.totalQuantity -= state.items[id].quantity;
        state.totalPrice -= state.items[id].price * state.items[id].quantity;
        delete state.items[id];
      }
    },
    clearCart(state) {
      state.items = {};
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  addMany,
  increaseItem,
  decreaseItem,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
