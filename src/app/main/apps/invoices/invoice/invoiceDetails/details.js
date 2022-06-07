import FusePageCarded from "@fuse/core/FusePageCarded";
import InvoicesHeader from "./invoiceHeader";
import InvoiceDetails from "./invoiceDetails";
import withReducer from "app/store/withReducer";
import reducer from "../../store";

function Details() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<InvoicesHeader />}
      content={<InvoiceDetails />}
      innerScroll
    />
  );
}

export default withReducer("invoicesApp", reducer)(Details);
