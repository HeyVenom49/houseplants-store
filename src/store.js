// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const LOCALSTORAGE_KEY = "houseplants_cart";

function loadState() {
  try {
    const serialized = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!serialized) return undefined;
    const parsed = JSON.parse(serialized);
    return { cart: parsed };
  } catch (e) {
    console.warn("Could not load state from localStorage", e);
    return undefined;
  }
}

function saveState(state) {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem(LOCALSTORAGE_KEY, serialized);
  } catch (e) {
    console.warn("Could not save state to localStorage", e);
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});
