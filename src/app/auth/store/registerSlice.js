import { createSlice } from "@reduxjs/toolkit";
import jwtService from "app/services/jwtService";
import { setUserData } from "./userSlice";
import { useHistory } from "react-router-dom";

export const submitRegister =
  ({ firstName, lastName, email, phoneNumber, password }) =>
  async (dispatch) => {
    return jwtService
      .createUser({ firstName, lastName, email, phoneNumber, password })
      .then((user) => {
        console.log("then: ", user);

        // in Redux
        dispatch(setUserData(user));

        return dispatch(registerSuccess());
      })
      .catch((errors) => {
        return dispatch(registerError(errors));
      });
  };

// those will be appears in Redux
const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: "auth/register",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
