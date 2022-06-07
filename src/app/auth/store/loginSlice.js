import { createSlice } from "@reduxjs/toolkit";
import jwtService from "app/services/jwtService";
import { setUserData } from "./userSlice";

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    console.log("1-loginSlice: ", email, ",", password);
    return jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("5-loginSlice after send api: ", user);
        dispatch(setUserData(user));

        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        return dispatch(loginError(errors));
      });
  };

const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
