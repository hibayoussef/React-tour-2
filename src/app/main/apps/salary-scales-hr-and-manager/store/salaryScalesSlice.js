import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSalaryScales = createAsyncThunk(
  "salaryScalesApp/salaryScales/getSalaryScales",
  async () => {
    const response = await axios.get("/salary-scales");
    const data = await response.data.data;
    console.log("salary scales data: ", data);
    return data;
  }
);

export const getJobs = async () => {
  const response = await axios.get("/jobs");
  return response.data.data;
};

// export const removeSalaryScale = createAsyncThunk(
//   "salaryScalesApp/salaryScales/removeSalaryScale",
//   async (productIds, { dispatch, getState }) => {
//     await axios.post("/api/e-commerce-app/remove-products", { productIds });

//     return productIds;
//   }
// );

export const removeSalaryScale = createAsyncThunk(
  "salaryScalesApp/salaryScales/removeSalaryScale",
  async (id, { dispatch }) => {
    const response = await axios
      .delete(`/salary-scales/${id}`)
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("delete salary scale: ", data);
    dispatch(getSalaryScales());
    return data;
  }
);

const salaryScalesAdapter = createEntityAdapter({});

export const {
  selectAll: selectSalaryScales,
  selectById: selectSalaryScaleById,
} = salaryScalesAdapter.getSelectors(
  (state) => state.salaryScalesApp.salaryScales
);

const salaryScalesSlice = createSlice({
  name: "salaryScalesApp/salaryScales",
  initialState: salaryScalesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setSalaryScalesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getSalaryScales.fulfilled]: salaryScalesAdapter.setAll,
    [removeSalaryScale.fulfilled]: (state, action) =>
      salaryScalesAdapter.removeOne(state, action.payload),
  },
});

export const { setSalaryScalesSearchText } = salaryScalesSlice.actions;

export default salaryScalesSlice.reducer;
