import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getLeave } from "./leaveSlice";

// export const getLeaves = createAsyncThunk(
//   "leavesApp/leaves/getLeaves",
//   async () => {
//     const response = await axios.get("/leaves");
//     console.log('get all approve leaves: ', response)
//     const data = await response.data.data;
//     console.log("leaves from backend:", data);

//     return data;
//   }
// );


export const getLeaves = createAsyncThunk(
  "leavesApp/leaves/getMyLeaves",
  async () => {
    const response = await axios.get("/users/profiles/my-profile");
    const data = await response.data.data.leaves;
    console.log("leaves from backend:", data);

    return data;
  }
);


export const getOrders = createAsyncThunk(
  "leavesApp/orders/getOrders",
  async () => {
    const response = await axios.get("/api/e-commerce-app/orders");
    const data = await response.data;

    return data;
  }
);

export const removeOrders = createAsyncThunk(
  "leavesApp/orders/removeOrders",
  async (orderIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-orders", { orderIds });

    return orderIds;
  }
);

const approvalLeavesAdapter = createEntityAdapter({});

export const {
  selectAll: selectApprovalLeaves,
  selectById: selectApprovalLeaveById,
} = approvalLeavesAdapter.getSelectors(
  (state) => state.leavesApp.approvalLeaves
);

const approvalLeaveSlice = createSlice({
  name: "leavesApp/leaves",
  initialState: approvalLeavesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getLeaves.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "approved");
      console.log("data approval leaaave: ", data);
      approvalLeavesAdapter.setAll(state, data);
    },
  },
});

export const { setOrdersSearchText } = approvalLeaveSlice.actions;

export default approvalLeaveSlice.reducer;
