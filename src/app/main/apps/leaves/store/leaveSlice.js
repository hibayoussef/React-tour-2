import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLeaves } from "./leavesSlice";


export const getJobs = async () => {
  const response = await axios.get("/jobs");
  const jobsRequestsData = await response.data.data;
  console.log("Response: ", jobsRequestsData);
  return jobsRequestsData;
};


export const getLeave = createAsyncThunk(
  "leavesApp/leave/getLeave",
  async (params) => {
    console.log("paaarams: ", params);
    const response = await axios.get(`/leaves/${params.leaveId}`);
    const data = await response.data;
    console.log("leave: ", data);

    return data === undefined ? null : data;
  }
);

export const addLeave = createAsyncThunk(
  "leavesApp/leave/addLeave",
  async (leave, { dispatch, getState }) => {
    console.log("backend-1-invoice: ", leave);
    const response = await axios.post("/leaves", leave);
    console.log("response: ", response);

    const data = await response.data.data;
    console.log("Hi I am Here in add new leave: ", data);
    dispatch(getLeaves());

    return data;
  }
);

export const addNumberOfLeaves = createAsyncThunk(
  "leavesApp/leave/addNumberOfLeaves",
  async (numberOfLeaves, { dispatch, getState }) => {
    console.log("numberOfLeaves: ", numberOfLeaves);
    const response = await axios.put("/auth-for-admin/user-leaves-categories", numberOfLeaves);
    const data = await response.data.data;
    console.log("Hi I am Here in add new numberOfLeaves: ", data);
    // dispatch(getSalaryScales());

    return data;
  }
);

const leaveSlice = createSlice({
  name: "leavesApp/leave",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getLeave.fulfilled]: (state, action) => action.payload,
    [addLeave.fulfilled]: (state, action) => action.payload,
    [addNumberOfLeaves.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = leaveSlice.actions;

export default leaveSlice.reducer;
