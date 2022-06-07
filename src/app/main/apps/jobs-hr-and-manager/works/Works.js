import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import WorksHeader from "./WorksHeader";
import WorksTable from "./WorksTable";

function Works() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<WorksHeader />}
      content={<WorksTable />}
      innerScroll
    />
  );
}

export default withReducer("worksApp", reducer)(Works);
