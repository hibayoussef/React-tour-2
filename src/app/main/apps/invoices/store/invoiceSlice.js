import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { getInvoices } from "./invoicesSlice";

export const getInvoice = async (params) => {
  const response = await axios.get(`/invoices/cruds/${params.invoiceId}`);
  return response.data.data;
};

export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  return response.data.data;
};

export const addInvoice = createAsyncThunk(
  "invoicesApp/invoice/addInvoice",
  async (invoice, { dispatch, getState }) => {
    const response = await axios.post("/invoices/cruds", invoice);

    const data = await response.data.data;
    dispatch(getInvoices());

    return data;
  }
);

export const rejectInvoice = createAsyncThunk(
  "invoicesApp/invoice/rejectInvoice",
  async (id, { dispatch }) => {
    const response = await axios
      .post(`/invoices/flow/${id}/reject`)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    dispatch(getInvoices());

    return data;
  }
);

export const confirmReview = createAsyncThunk(
  "invoicesApp/invoice/confirmReview",
  async ({ id, invoice }, { dispatch }) => {
    const response = await axios
      .post(`/invoices/flow/${id}/review`, invoice)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    dispatch(getInvoices());
    return data;
  }
);

export const markAsPaid = createAsyncThunk(
  "invoicesApp/invoice/markAsPaid",
  async (id, { dispatch }) => {
    const response = await axios
      .post(`/invoices/flow/${id}/mark-as-paid`)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    dispatch(getInvoices());
    return data;
  }
);

export const approveInvoice = createAsyncThunk(
  "invoicesApp/invoice/confirmReview",
  async (id, { dispatch }) => {
    const response = await axios
      .post(`/invoices/flow/${id}/approve`)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    dispatch(getInvoices());
    return data;
  }
);

export const assignToUser = createAsyncThunk(
  "invoicesApp/invoice/assignToUser",
  async ({ invoiceId, userId, assignmentNote }, { dispatch }) => {
    const response = await axios
      .post(`/invoices/flow/${invoiceId}/assign-to-user`, {
        userId,
        assignmentNote,
      })
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    dispatch(getInvoices());
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.post("/api/e-commerce-app/remove-product", { id });

    return id;
  }
);

export const saveInvoice = createAsyncThunk(
  "invoicesApp/invoice/saveInvoice",
  async (invoice, netAmount, taxNumber, grossAmount, issueDate, dueDate) => {
    const fd = new FormData();
    fd.append("invoice", invoice);
    fd.append("data", {
      netAmount,
      taxNumber,
      grossAmount,
      issueDate,
      dueDate,
    });
    await axios.post("/invoices/cruds", fd, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }
);

const invoiceSlice = createSlice({
  name: "invoicesApp/invoice",
  initialState: null,
  reducers: {
    resetInvoice: () => null,
    newInvoice: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          invoice: "",
          netAmount: 0,
          taxNumber: 0,
          grossAmount: 0,
          dueDate: "",
          issueDate: "",
        },
      }),
    },
  },
  extraReducers: {
    [addInvoice.fulfilled]: (state, action) => action.payload,
    // [getInvoice.fulfilled]: (state, action) => action.payload,
    [saveInvoice.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
    [rejectInvoice.fulfilled]: (state, action) => action.payload,
    [confirmReview.fulfilled]: (state, action) => action.payload,
    [approveInvoice.fulfilled]: (state, action) => action.payload,
    [markAsPaid.fulfilled]: (state, action) => action.payload,
    [assignToUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { newInvoice, resetInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
