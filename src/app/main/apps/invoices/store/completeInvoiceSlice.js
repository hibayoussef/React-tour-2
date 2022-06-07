import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCompleteInvoices = createAsyncThunk(
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

const completeInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCompleteInvoices,
  selectById: selectCompleteInvoiceById,
} = completeInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.completeInvoices
);

const completeInvoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: completeInvoicesAdapter.getInitialState({
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
      completeInvoicesAdapter.removeOne(state, action.payload),
    [getCompleteInvoices.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "completed");
      console.log("data approval: ", data);
      completeInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = completeInvoicesSlice.actions;

export default completeInvoicesSlice.reducer;
