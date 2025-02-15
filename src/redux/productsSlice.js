import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoading: false,
  products: [],
  error: null,
};

export let getProducts = createAsyncThunk("products/getProducts", getData);

async function getData() {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  return data.data;
}

let productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: function (builder) {
    builder.addCase(getProducts.pending, function (state, action) {
      state.isLoading = true;
    });

    builder.addCase(getProducts.fulfilled, function (state, action) {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(getProducts.rejected, function (state, action) {
      state.isLoading = true;
      state.error = action.error;
    });
  },
});

export let productsReducer = productsSlice.reducer ;
