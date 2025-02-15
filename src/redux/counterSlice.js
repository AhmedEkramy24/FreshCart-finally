import { createSlice } from "@reduxjs/toolkit";

let initialState = { count: 0, userName: "ahmed ekramy" };

const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    increase: function (state, action) {
      state.count += 1;
    },
    decrease: function (state, action) {
      state.count -= 1;
    },
    increaseByAmount: function (state, action) {
      state.count += action.payload;
      console.log(action);
    },
  },
});

export let counterReducer = counterSlice.reducer;
export let { increase, decrease, increaseByAmount } = counterSlice.actions;
