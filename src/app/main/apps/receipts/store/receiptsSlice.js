import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReceipts = createAsyncThunk(
  "eCommerceApp/products/getAllReceipts",
  async () => {
    const response = await axios.get("financial/receipts/by-admin");
    console.log("response: ", response);
    const data = response.data.data;
    console.log("data: ", data);
    return data;
  }
);

export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  console.log("get Users response:  ", response);
  return response.data.data;
};


export const removeProducts = createAsyncThunk(
  "eCommerceApp/products/removeProducts",
  async (productIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-products", { productIds });

    return productIds;
  }
);

export const removeReceipts = createAsyncThunk(
  "eCommerceApp/products/removeReceipts",
  async (params, { dispatch, getState }) => {
    console.log("receipt Id: ", params.receiptId);
    console.log("salary Id: ", params.id);
    const response = await axios.delete(`/financial/receipts/${id}`);
    dispatch(getAllReceipts());
    console.log("response delete: ", response.data);
    return response.data.data;
  }
);

export const removeReceipt = createAsyncThunk(
  "eCommerceApp/products/removeReceipts",
  async (receiptId) => {
    await axios.delete(`/financial/receipts/${receiptId}`);
    console.log("deleted");
    dispatch(getAllReceipts());
    return receiptId;
  }
);

const receiptsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  receiptsAdapter.getSelectors((state) => state.eCommerceApp.receipts);

const receiptsSlice = createSlice({
  name: "eCommerceApp/receipts",
  initialState: receiptsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getAllReceipts.fulfilled]: receiptsAdapter.setAll,

    [removeReceipts.fulfilled]: (state, action) => null,

    // productsAdapter.removeOne(state, action.payload),
    // contactsAdapter.removeOne(state, action.payload);
  },
});

export const { setProductsSearchText } = receiptsSlice.actions;

export default receiptsSlice.reducer;
