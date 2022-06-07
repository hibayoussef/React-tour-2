import { combineReducers } from "@reduxjs/toolkit";
import work from "./workSlice";
import works from "./worksSlice";

const reducer = combineReducers({
  works,
  work,
});

export default reducer;
