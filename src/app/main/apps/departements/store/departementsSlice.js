import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getDepartements = createAsyncThunk(
  "departementsApp/departements/getDepartements",
  async () => {
    const response = await axios.get("/departments");
    const data = await response.data.data;
    console.log("get all departements: ", data);
    return data;
  }
);

export const removeOrders = createAsyncThunk(
  "eCommerceApp/orders/removeOrders",
  async (orderIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-orders", { orderIds });

    return orderIds;
  }
);

const departementsAdapter = createEntityAdapter({});

export const {
  selectAll: selectDepartements,
  selectById: selectDepartementById,
} = departementsAdapter.getSelectors(
  (state) => state.departementsApp.departements
);

const departementsSlice = createSlice({
  name: "departementsApp/departements",
  initialState: departementsAdapter.getInitialState({
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
    [getDepartements.fulfilled]: departementsAdapter.setAll,
    [removeOrders.fulfilled]: (state, action) =>
      departementsAdapter.removeMany(state, action.payload),
  },
});

export const { setOrdersSearchText } = departementsSlice.actions;

export default departementsSlice.reducer;
