import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getWorks, getUsers } from "./worksSlice";



export const getWork = createAsyncThunk(
  "worksApp/work/getWork",
  async (params) => {
    console.log("paaarams: ", params);
    const response = await axios.get(`/jobs/${params.id}`);
    const data = await response.data.data;
    console.log("work: ", data);

    return data === undefined ? null : data;
  }
);


export const addWork = createAsyncThunk(
  "worksApp/works/addWork",
  async (work, { dispatch, getState }) => {
    console.log("asssss: ", work);
    const response = await axios.post("/jobs", work);
    const data = await response.data.data;
    console.log("Hi I am Here in add new Job: ", data);
    dispatch(getWorks());

    return data;
  }
);

export const assignJobToUser = createAsyncThunk(
  "worksApp/works/assignJobToUser",
  async ({ id, jobId, level }, { dispatch }) => {
    console.log("hi in new function");
    console.log("invoiceId, userId, message", id, jobId, level);
    const response = await axios
      .patch(`/users/for-admin/${id}/assign-job`, {
        jobId,
        level,
      })
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("assign job to user: ", data);

    // dispatch(getInvoice(data?.id));
    // dispatch(getUsers());
    // dispatch(getWork({jobId}))
    dispatch(getWorks())
    return data;
  }
);



export const removeWork = createAsyncThunk(
  "worksRequests/deleteWork",
  async (id, { dispatch }) => {
    console.log('id:', id)
    const response = await axios.delete(`/jobs/${id}`)
    console.log('response: ', response )
    const data = await response.data.data;
    dispatch(getWorks());
    return data;
  }
);



const workSlice = createSlice({
  name: "worksApp/work",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [addWork.fulfilled]: (state, action) => action.payload,
    [getWork.fulfilled]: (state, action) => action.payload,
    [assignJobToUser.fulfilled]: (state, action) => action.payload,
    [removeWork.fulfilled]: (state, action) => action.payload
  },
});

export const { resetOrder } = workSlice.actions;

export default workSlice.reducer;
