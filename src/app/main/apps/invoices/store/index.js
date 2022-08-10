import { combineReducers } from "@reduxjs/toolkit";
import invoice from "./invoiceSlice";
import invoices from "./invoicesSlice";
import approvalInvoices from "./approvalInvoiceSlice";
import reviewInvoices from "./reviewInvoiceSlice";
import paymentInvoices from "./paymentInvoiceSlice";
import completeInvoices from "./completeInvoiceSlice";
import rejectedInvoices from "./rejectedInvoiceSlice";
import inAnalysticInvoices from "./inanalysticInvoiceSlice";

const reducer = combineReducers({
  invoice,
  invoices,
  approvalInvoices,
  reviewInvoices,
  paymentInvoices,
  completeInvoices,
  rejectedInvoices,
  inAnalysticInvoices,
});

export default reducer;
