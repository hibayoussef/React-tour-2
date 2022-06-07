import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getReceipt = createAsyncThunk(
  "Receipts/getReceipt",
  async (params) => {
    console.log("idddd: ", params);
    const response = await axios.get(`/financial/receipts/${params}`);
    console.log("url: ", "/financial/receipts/", params);
    console.log("resss: ", response);
    const data = response.data.data;
    console.log("reddddd: ", data);
    // return data === undefined ? null : data;
    return data;
  }
);

// export const saveOrder = createAsyncThunk(
//   "eCommerceApp/order/saveOrder",
//   async (order) => {
//     const response = await axios.post("/api/e-commerce-app/order/save", order);
//     const data = await response.data;

//     return data;
//   }
// );

const receiptSlice = createSlice({
  name: "eCommerceApp/receipt",
  initialState: null,
  reducers: {
    // resetOrder: () => null,
  },
  extraReducers: {
    [getReceipt.fulfilled]: (state, action) => action.payload,
    // [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

// export const { resetOrder } = receiptSlice.actions;

export default receiptSlice.reducer;
