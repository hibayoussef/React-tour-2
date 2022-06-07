import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDepartements } from "./departementsSlice";

export const getDepartement = createAsyncThunk(
  "departementsApp/departement/getDepartement",
  async (params) => {
    const response = await axios.get(`/departments/${params.departementId}`);
    const data = await response.data.data;

    return data === undefined ? null : data;
  }
);

export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  console.log("get Users response:  ", response);
  return response.data.data;
};

export const addDepartement = createAsyncThunk(
  "departementsApp/departement/addDepartement",
  async (departement, { dispatch, getState }) => {
    console.log(departement)
    const response = await axios.post("/departments", {maxNumberOfEmployees: +departement.maxNumberOfEmployees, title: departement.title});
    console.log("response: ", response);

    const data = await response.data.data;
    console.log("Hi I am Here in add new invoice: ", data);
    dispatch(getDepartements());

    return data;
  }
);

export const addUserToDepartement = createAsyncThunk(
  "departementsApp/departement/AddUserToDepartement",
  async ({ id, ids }, { dispatch }) => {
    console.log("hi in new function");
    console.log("ppppppppppppppppppppppp: ", id, ids);
    const response = await axios
      .post(`/departments/${id}/add-user-to-departments`, {
        ids,
      })
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("add-user-to-departments: ", data);

    // dispatch(getInvoice(data?.id));
    dispatch(getInvoices());
    return data;
  }
);

const departementSlice = createSlice({
  name: "departementsApp/departement",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [addDepartement.fulfilled]: (state, action) => action.payload,
    [getDepartement.fulfilled]: (state, action) => action.payload,
    [addUserToDepartement.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = departementSlice.actions;

export default departementSlice.reducer;
