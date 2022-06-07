import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCategoriesLeaves } from "./categoriesSlice";


export const addCategoryLeave = createAsyncThunk(
  "categoriesApp/categories/addCategoryLeave",
  async (category, { dispatch, getState }) => {
    console.log("category: ", category);
    const response = await axios.post("/leaves-categories", {name: category.name ,deductionAmount: +category.deductionAmount});

    const data = await response.data.data;
    console.log("Hi I am Here in add new Job: ", data);
    dispatch(getCategoriesLeaves());

    return data;
  }
);




export const removeCategoryLeave = createAsyncThunk(
  "categoriesRequests/deleteCategory",
  async (id, { dispatch }) => {
    console.log('id:', id)
    const response = await axios.delete(`/leaves-categories/${id}`)
    console.log('response: ', response )
    const data = await response.data.data;
    dispatch(getCategoriesLeaves());
    return data;
  }
);



const categorySlice = createSlice({
  name: "worksApp/work",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [addCategoryLeave.fulfilled]: (state, action) => action.payload,
    [removeCategoryLeave.fulfilled]: (state, action) => action.payload
  },
});

export const { resetOrder } = categorySlice.actions;

export default categorySlice.reducer;
