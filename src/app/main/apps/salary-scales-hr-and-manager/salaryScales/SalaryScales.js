import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import SalaryScalesHeader from "./SalaryScalesHeader";
import SalaryScalesTable from "./SalaryScalesTable";

function SalaryScales() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<SalaryScalesHeader />}
      content={<SalaryScalesTable />}
      innerScroll
    />
  );
}

export default withReducer("salaryScalesApp", reducer)(SalaryScales);
