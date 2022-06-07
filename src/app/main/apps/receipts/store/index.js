import { combineReducers } from "@reduxjs/toolkit";
import receipt from "./receiptSlice";
import receipts from "./receiptsSlice";

const reducer = combineReducers({
  receipt,
  receipts,
});

export default reducer;
