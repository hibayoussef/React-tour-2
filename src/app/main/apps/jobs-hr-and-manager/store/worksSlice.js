import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";



export const getWorks = createAsyncThunk("worksRequests/getWorks", async () => {
  const response = await axios.get("/jobs");
  const worksRequestsData = await response.data.data;
  console.log("worksRequestsData: ", worksRequestsData);
  return worksRequestsData;
});

export const getDepartments = async () => {
  const response = await axios.get("/departments");
  console.log("get Users response:  ", response);
  return response.data.data;
};


export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  console.log("get Users response:  ", response);
  return response.data.data;
};


export const removeOrders = createAsyncThunk(
  "leavesApp/orders/removeOrders",
  async (orderIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-orders", { orderIds });

    return orderIds;
  }
);

const worksAdapter = createEntityAdapter({});

export const { selectAll: selectWorks, selectById: selectWorkById } =
worksAdapter.getSelectors((state) => state.worksApp.works);

const worksSlice = createSlice({
  name: "worksApp/woks",
  initialState: worksAdapter.getInitialState({
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
    // [getOrders.fulfilled]: worksAdapter.setAll,
    // [getLeaves.fulfilled]: leavesAdapter.setAll,

    [getWorks.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload
      console.log("data approval: ", data);
      worksAdapter.setAll(state, data);
    },

    [removeOrders.fulfilled]: (state, action) =>
    worksAdapter.removeMany(state, action.payload),
  
  },
});

export const { setOrdersSearchText } = worksSlice.actions;

export default worksSlice.reducer;
