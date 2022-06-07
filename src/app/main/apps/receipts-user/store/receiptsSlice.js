import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReceipts = createAsyncThunk(
  "eCommerceApp/products/getAllReceipts",
  async () => {
    const response = await axios.get("financial/receipts");
    console.log("response: ", response);
    const data = response.data.data;
    console.log("data: ", data);
    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products/removeProducts",
  async (productIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-products", { productIds });

    return productIds;
  }
);

export const removeReceipt = createAsyncThunk(
  "eCommerceApp/products/removeReceipts",
  async (receiptId) => {
    await axios.post(`/financial/receipts/${receiptId}`);
    console.log("deleted");
    return contactId;
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

    // [removeProducts.fulfilled]: (state, action) =>
    // receiptsAdapter.removeMany(state, action.payload),
    [removeReceipt.fulfilled]: (state, action) =>
      receiptsAdapter.removeMany(state, action.payload),
    // productsAdapter.removeOne(state, action.payload),

    // contactsAdapter.removeOne(state, action.payload);
  },
});

export const { setProductsSearchText } = receiptsSlice.actions;

export default receiptsSlice.reducer;
