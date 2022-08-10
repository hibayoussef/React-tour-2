import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getInAnalyInvoices = createAsyncThunk(
  "invoicesApp/invoices/getInAnalysticInvoices",
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

const InAnalysticInvoicesAdapter = createEntityAdapter({});

export const {
  selectAll: selectInAnalysticInvoices,
  selectById: selectInAnalysticInvoiceById,
} = InAnalysticInvoicesAdapter.getSelectors(
  (state) => state.invoicesApp.inAnalysticInvoices
);

const inanalysticInvoicesSlice = createSlice({
  name: "invoicesApp/InAnalysticInvoices",
  initialState: InAnalysticInvoicesAdapter.getInitialState({
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
      InAnalysticInvoicesAdapter.removeOne(state, action.payload),
    [getInAnalyInvoices.fulfilled]: (state, { payload }) => {
      console.log(
        "payload innnnnnnnnnnnnnnnnnnnnnnnnnnnnnafafafafaf: ",
        payload
      );
      const data = payload.filter((u) => u.status === "in_analyzing_process");
      console.log("data approval: ", data);
      InAnalysticInvoicesAdapter.setAll(state, data);
      state.searchText = "";
      console.log("innnnnn: ", data);
    },
  },
});

export const { setInvoicesSearchText } = inanalysticInvoicesSlice.actions;

export default inanalysticInvoicesSlice.reducer;
