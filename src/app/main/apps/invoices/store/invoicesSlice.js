import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getInvoices = createAsyncThunk(
  "invoicesApp/invoices/getInvoices",
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

const invoicesAdapter = createEntityAdapter({});

export const { selectAll: selectInvoices, selectById: selectInvoiceById } =
  invoicesAdapter.getSelectors((state) => state.invoicesApp.invoices);

const invoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: invoicesAdapter.getInitialState({
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
    [getInvoices.fulfilled]: invoicesAdapter.setAll,
    [removeInvoice.fulfilled]: (state, action) =>
      invoicesAdapter.removeOne(state, action.payload),
  },
});

export const { setInvoicesSearchText } = invoicesSlice.actions;

export default invoicesSlice.reducer;
