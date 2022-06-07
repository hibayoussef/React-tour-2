import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import ArchiveLeavesHeader from "./ArchiveLeavesHeader";
import ArchiveLeavesTable from "./ArchiveLeavesTable";

function ArchiveLeaves() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<ArchiveLeavesHeader />}
      content={<ArchiveLeavesTable />}
      innerScroll
    />
  );
}

export default withReducer("leavesApp", reducer)(ArchiveLeaves);
