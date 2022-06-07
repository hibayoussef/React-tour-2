import { combineReducers } from "@reduxjs/toolkit";
import salaryScale from "./salaryScaleSlice";
import salaryScales from "./salaryScalesSlice";

const reducer = combineReducers({
  salaryScales,
  salaryScale,
});

export default reducer;
