import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import ArchiveInvoicesHeader from "./ArchiveInvoicesHeader";
import ArchiveInvoicesTable from "./ArchiveInvoicesTable";

function ArchiveInvoices() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<ArchiveInvoicesHeader />}
      content={<ArchiveInvoicesTable />}
      innerScroll
    />
  );
}

export default withReducer("invoicesApp", reducer)(ArchiveInvoices);
