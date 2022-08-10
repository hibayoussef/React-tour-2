import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import NumberOfLeavesHeader from "./NumberOfLeavesHeader";
import NumberOfLeavesTable from "./NumberOfLeavesTable";

function NumberOfLeaves() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<NumberOfLeavesHeader />}
      content={<NumberOfLeavesTable />}
      innerScroll
    />
  );
}

export default withReducer("leavesApp", reducer)(NumberOfLeaves);
