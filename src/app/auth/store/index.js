import { combineReducers } from "@reduxjs/toolkit";
import login from "./loginSlice";
import register from "./registerSlice";
import resetPassword from "./resetPasswordSlice";
import user from "./userSlice";

const authReducers = combineReducers({
  user,
  login,
  register,
  resetPassword,
});

export default authReducers;
