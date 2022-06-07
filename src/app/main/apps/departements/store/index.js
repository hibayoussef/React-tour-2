import { combineReducers } from "@reduxjs/toolkit";
import departement from "./departementSlice";
import departements from "./departementsSlice";

const reducer = combineReducers({
  departements,
  departement,
});

export default reducer;
