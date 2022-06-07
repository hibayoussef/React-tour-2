import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getLeave } from "./leaveSlice";

export const getLeaves = createAsyncThunk(
  "leavesApp/leaves/getLeaves",
  async () => {
    const response = await axios.get("/leaves");
    const data = await response.data.data;
    console.log("leaves from backend:", data);

    return data;
  }
);


export const getCategories = async () => {
  const response = await axios.get("/leaves-categories");
  console.log("get Users response:  ", response);
  return response.data.data;
};

export const approveLeave = createAsyncThunk(
  "leavesApp/leave/approveLeave",
  async (id, { dispatch }) => {
    const response = await axios
      .patch(`/leaves/${id}/approve`)
      .catch((err) => console.log(err));
    const data = await response.data.data;

    dispatch(getLeaves());
    dispatch(getLeave());
    console.log("user approve inside Slice: ", data);

    return data;
  }
);

export const rejectLeave = createAsyncThunk(
  "leavesApp/leave/rejectLeave",
  async (id, { dispatch }) => {
    const response = await axios
      .patch(`/leaves/${id}/reject`)
      .catch((err) => console.log(err));
    const data = await response.data.data;

    dispatch(getLeaves());
    dispatch(getLeave());
    console.log("user rejected inside Slice: ", data);

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

const leavesAdapter = createEntityAdapter({});

export const { selectAll: selectLeaves, selectById: selectLeaveById } =
  leavesAdapter.getSelectors((state) => state.leavesApp.leaves);

const leavesSlice = createSlice({
  name: "leavesApp/leaves",
  initialState: leavesAdapter.getInitialState({
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
    [getOrders.fulfilled]: leavesAdapter.setAll,
    // [getLeaves.fulfilled]: leavesAdapter.setAll,

    [getLeaves.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload.filter((u) => u.status === "pending_approval");
      console.log("data approval: ", data);
      leavesAdapter.setAll(state, data);
    },

    [removeOrders.fulfilled]: (state, action) =>
      leavesAdapter.removeMany(state, action.payload),
    [approveLeave.fulfilled]: (state, action) => {
      leavesAdapter.addOne;
    },
    [rejectLeave.fulfilled]: (state, action) => {
      leavesAdapter.addOne;
    },
  },
});

export const { setOrdersSearchText } = leavesSlice.actions;

export default leavesSlice.reducer;
