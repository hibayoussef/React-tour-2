import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getApprovalInvoices = createAsyncThunk(
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

const approvalInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectApprovalInvoices,
  selectById: selectApprovalInvoiceById,
} = approvalInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.approvalInvoices
);

const approvalInvoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: approvalInvoicesAdapter.getInitialState({
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
      approvalInvoicesAdapter.removeOne(state, action.payload),
    [getApprovalInvoices.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "approval_pending");
      console.log("data approval: ", data);
      approvalInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = approvalInvoicesSlice.actions;

export default approvalInvoicesSlice.reducer;
