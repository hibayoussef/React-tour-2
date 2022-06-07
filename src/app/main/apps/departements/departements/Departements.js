import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import DepartementsHeader from "./DepartementsHeader";
import DepartementsTable from "./DepartementsTable";

function Departements() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<DepartementsHeader />}
      content={<DepartementsTable />}
      innerScroll
    />
  );
}

export default withReducer("departementsApp", reducer)(Departements);
