import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLeaves } from "./leavesSlice";

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

const leaveSlice = createSlice({
  name: "leavesApp/leave",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getLeave.fulfilled]: (state, action) => action.payload,
    [addLeave.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = leaveSlice.actions;

export default leaveSlice.reducer;
