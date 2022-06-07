import { createSlice } from "@reduxjs/toolkit";
import jwtService from "app/services/jwtService";

export const submitResetPassword =
  ({ oldPassword, newPassword, email }) =>
  async (dispatch) => {
    return jwtService
      .resetPassword({ oldPassword, newPassword, email })
      .then((resetPassword) => {
        console.log("then: ", resetPassword);

        return dispatch(resetPasswordSuccess());
      })
      .catch((errors) => {
        return dispatch(resetPasswordError(errors));
      });
  };

// those will be appears in Redux
const initialState = {
  success: false,
  errors: [],
};

const resetPasswordSlice = createSlice({
  name: "auth/resetPassword",
  initialState,
  reducers: {
    resetPasswordSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    resetPasswordError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { resetPasswordSuccess, resetPasswordError } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
