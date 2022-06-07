import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getReviewInvoices = createAsyncThunk(
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

const reviewInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectReviewInvoices,
  selectById: selectReviewInvoiceById,
} = reviewInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.reviewInvoices
);

const reviewInvoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: reviewInvoicesAdapter.getInitialState({
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
      reviewInvoicesAdapter.removeOne(state, action.payload),
    [getReviewInvoices.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "review_pending");
      console.log("data approval: ", data);
      reviewInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = reviewInvoicesSlice.actions;

export default reviewInvoicesSlice.reducer;
