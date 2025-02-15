import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { productsReducer } from "./productsSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    productsReducer,
  },
});
