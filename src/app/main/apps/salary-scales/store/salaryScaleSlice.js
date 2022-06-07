import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { getSalaryScales } from "./salaryScalesSlice";

export const getJobs = async () => {
  const response = await axios.get("/jobs");
  const jobsRequestsData = await response.data.data;
  console.log("Response: ", jobsRequestsData);
  return jobsRequestsData;
};

export const getSalaryScale = async (params) => {
  console.log("ppparams: ", params);
  const response = await axios.get(`/salary-scales/${params.salaryScaleId}`);
  console.log("id: ", params.salaryScaleId);
  return response.data.data;
};

export const removeProduct = createAsyncThunk(
  "salaryScalesApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().salaryScalesApp.salaryScale;
    await axios.post("/api/e-commerce-app/remove-product", { id });

    return id;
  }
);

export const addSalaryScale = createAsyncThunk(
  "salaryScalesApp/salaryScale/addSalaryScale",
  async (salaryScale, { dispatch, getState }) => {
    console.log("salary Scale: ", salaryScale);
    const response = await axios.post("/salary-scales", salaryScale);
    const data = await response.data.data;
    console.log("Hi I am Here in add new Job: ", data);
    dispatch(getSalaryScales());

    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "salaryScalesApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const { product } = getState().salaryScalesApp;

    const response = await axios.post("/api/e-commerce-app/product/save", {
      ...product,
      ...productData,
    });
    const data = await response.data;

    return data;
  }
);

const salaryScaleSlice = createSlice({
  name: "salaryScalesApp/salaryScale",
  initialState: null,
  reducers: {
    resetSalaryScale: () => null,
    newSalaryScale: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          JobId: "",
          employeeLevel: "",
          amount: "",

          // isActive: true,
        },
      }),
    },
  },
  extraReducers: {
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
    [addSalaryScale.fulfilled]: (state, action) => action.payload,
  },
});

export const { newSalaryScale, resetSalaryScale } = salaryScaleSlice.actions;

export default salaryScaleSlice.reducer;
