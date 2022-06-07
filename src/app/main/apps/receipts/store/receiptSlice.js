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
    return data === undefined ? null : data;
  }
);

export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  console.log("get Users response:  ", response);
  return response.data.data;
};

export const removeDeduction = createAsyncThunk(
  "Receipts/removeDeduction",
  async (params, { dispatch, getState }) => {
    console.log("receipt Id: ", params.receiptId);
    console.log("deduction Id: ", params.id);
    const response = await axios.delete(
      `/financial/receipts/${params.receiptId}/deductions/${params.id}`
    );

    console.log("response: ", response);
    console.log("response.data: ", response.data.data.message);
    return response.data.data.message;
  }
);

export const removeSalary = createAsyncThunk(
  "Receipts/removeSalary",
  async (params, { dispatch, getState }) => {
    console.log("receipt Id: ", params.receiptId);
    console.log("salary Id: ", params.id);
    const response = await axios.delete(
      `/financial/receipts/${params.receiptId}/salaries/${params.id}`
    );
    console.log("response delete: ", response.data.data.message);
    return response.data.data.message;
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
  reducers: {},
  extraReducers: {
    [getReceipt.fulfilled]: (state, action) => action.payload,
    [removeDeduction.fulfilled]: (state, action) => null,
    [removeSalary.fulfilled]: (state, action) => null,
    // [saveOrder.fulfilled]: (state, action) => action.payload,
    // [removeDeduction.fulfilled]: (state, action) =>
    //   removeOne(state, action.payload),
  },
});

// export const { resetOrder } = receiptSlice.actions;

export default receiptSlice.reducer;
