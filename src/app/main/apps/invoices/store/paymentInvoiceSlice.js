import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getPaymentInvoices = createAsyncThunk(
  "invoicesApp/invoices/getReviewInvoices",
  async () => {
    const response = await axios.get("/invoices/cruds");
    const data = await response.data.data;
    console.log("invoices from backend:", data);

    return data;
  }
);

export const removeInvoice = createAsyncThunk(
  "invoicesApp/invoices/removeInvoice",
  async (id, { dispatch }) => {
    const response = await axios
      .delete(`/invoices/cruds/${id}`)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("delete invoices: ", data);
    dispatch(getInvoices());
    return data;
  }
);

const paymentInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectPaymentInvoices,
  selectById: selectApprovalInvoiceById,
} = paymentInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.paymentInvoices
);

const paymentInvoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: paymentInvoicesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setInvoicesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [removeInvoice.fulfilled]: (state, action) =>
      paymentInvoicesAdapter.removeOne(state, action.payload),
    [getPaymentInvoices.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "payment_pending");
      console.log("data approval: ", data);
      paymentInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = paymentInvoicesSlice.actions;

export default paymentInvoicesSlice.reducer;
