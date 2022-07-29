import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 currency:{symbol:null,label:null},
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency={symbol:action.payload.symbol,label:action.payload.label}
    },
  },
});

export const {
  setCurrency,
} = currencySlice.actions;
export default currencySlice.reducer;
