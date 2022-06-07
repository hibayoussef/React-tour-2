import { combineReducers } from "@reduxjs/toolkit";
import receipt from "./receiptSlice";
import receipts from "./receiptsSlice";
import myReceipts from './myReceiptsSlice';

const reducer = combineReducers({
  myReceipts,
  receipt,
  receipts,
 
});

export default reducer;
