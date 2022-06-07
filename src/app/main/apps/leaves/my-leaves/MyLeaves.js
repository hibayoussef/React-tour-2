import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import MyLeavesHeader from "./MyLeavesHeader";
import MyLeavesTable from "./MyLeavesTable";

function MyLeaves() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<MyLeavesHeader />}
      content={<MyLeavesTable />}
      innerScroll
    />
  );
}

export default withReducer("leavesApp", reducer)(MyLeaves);
