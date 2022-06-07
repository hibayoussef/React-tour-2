import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getMyLeaves = createAsyncThunk(
  "leavesApp/leaves/getMyLeaves",
  async () => {
    const response = await axios.get("/users/profiles/my-profile");
    const data = await response.data.data.leaves;
    console.log("leaves from backend:", data);

    return data;
  }
);


const myLeavesAdapter = createEntityAdapter({});

export const { selectAll: selectMyLeaves, selectById: selectMyLeaveById } =
  myLeavesAdapter.getSelectors((state) => state.leavesApp.myLeaves);

const leavesSlice = createSlice({
  name: "leavesApp/getMyLeaves",
  initialState: myLeavesAdapter.getInitialState({
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
    [getMyLeaves.fulfilled]: (state, { payload }) => {
      console.log("payload my leaves: ", payload);
      const data = payload;
      console.log("data payload my leaves: ", data);
      myLeavesAdapter.setAll(state, data);
    },
  },
});

export const { setOrdersSearchText } = leavesSlice.actions;

export default leavesSlice.reducer;
