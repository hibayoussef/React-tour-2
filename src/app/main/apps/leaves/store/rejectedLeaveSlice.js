import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// export const getLeaves = createAsyncThunk(
//   "leavesApp/leaves/getLeaves",
//   async () => {
//     const response = await axios.get("/leaves");
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

const rejectedLeavesAdapter = createEntityAdapter({});

export const {
  selectAll: selectRejectedLeaves,
  selectById: selectRejectedLeaveById,
} = rejectedLeavesAdapter.getSelectors(
  (state) => state.leavesApp.rejectedLeaves
);

const rejectedLeavesSlice = createSlice({
  name: "leavesApp/leaves",
  initialState: rejectedLeavesAdapter.getInitialState({
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
      const data = payload.filter((u) => u.status === "rejected");
      console.log("data approval: ", data);
      rejectedLeavesAdapter.setAll(state, data);
    },
  },
});

export const { setOrdersSearchText } = rejectedLeavesSlice.actions;

export default rejectedLeavesSlice.reducer;
