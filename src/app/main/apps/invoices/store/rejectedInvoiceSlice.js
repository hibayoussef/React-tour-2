import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getRejectedInvoices = createAsyncThunk(
  "invoicesApp/invoices/getRejectedInvoices",
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

const rejectedInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectRejectedInvoices,
  selectById: selectRejectedInvoiceById,
} = rejectedInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.rejectedInvoices
);

const rejectedInvoicesSlice = createSlice({
  name: "invoicesApp/archive",
  initialState: rejectedInvoicesAdapter.getInitialState({
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
    // [removeInvoice.fulfilled]: (state, action) =>
    //   rejectedInvoicesAdapter.removeOne(state, action.payload),
    [getRejectedInvoices.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "rejected");
      console.log("data approval: ", data);
      rejectedInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = rejectedInvoicesSlice.actions;

export default rejectedInvoicesSlice.reducer;
