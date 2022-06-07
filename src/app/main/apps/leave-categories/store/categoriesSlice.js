import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";



export const getCategoriesLeaves = createAsyncThunk("categoriesRequests/getCategoriesLeaves", async () => {
  const response = await axios.get("/leaves-categories");
  const categoriesLeavesRequestsData = await response.data.data;
  console.log("categoriesLeavesRequestsData: ", categoriesLeavesRequestsData);
  return categoriesLeavesRequestsData;
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

const CategoriesLeavesAdapter = createEntityAdapter({});

export const { selectAll: selectCategoriesLeaves, selectById: selectCategoryLeaveById } =
CategoriesLeavesAdapter.getSelectors((state) => state.categoriesApp.categories);

const categoriesSlice = createSlice({
  name: "categoriesApp/categories",
  initialState: CategoriesLeavesAdapter.getInitialState({
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

    [getCategoriesLeaves.fulfilled]: (state, { payload }) => {
      console.log("CategoriesLeavesAdapter: ", payload);
      const data = payload
      console.log("CategoriesLeavesAdapter: ", data);
      CategoriesLeavesAdapter.setAll(state, data);
    },

    [removeOrders.fulfilled]: (state, action) =>
    CategoriesLeavesAdapter.removeMany(state, action.payload),
  
  },
});

export const { setOrdersSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
