import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import LeavesHeader from "./LeavesHeader";
import LeavesTable from "./LeavesTable";

function Leaves() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<LeavesHeader />}
      content={<LeavesTable />}
      innerScroll
    />
  );
}

export default withReducer("leavesApp", reducer)(Leaves);
