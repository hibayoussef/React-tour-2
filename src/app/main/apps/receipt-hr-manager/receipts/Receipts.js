import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import ReceiptsHeader from "./ReceiptsHeader";
import ReceiptsTable from "./ReceiptsTable";

function Receipts() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<ReceiptsHeader />}
      content={<ReceiptsTable />}
      innerScroll
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Receipts);
