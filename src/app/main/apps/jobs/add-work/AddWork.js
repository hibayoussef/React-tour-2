import FusePageCarded from "@fuse/core/FusePageCarded";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import withReducer from "app/store/withReducer";
import { useState } from "react";
import _ from "@lodash";
import { FormProvider } from "react-hook-form";
import reducer from "../store";
import AddWorkHeader from "./AddWorkHeader";
import ShippingTab from "./tabs/ShippingTab";

function AddWork(props) {
  const [tabValue, setTabValue] = useState(0);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <FormProvider>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<AddWorkHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64" label="Job information" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl ">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <ShippingTab />
            </div>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default withReducer("worksApp", reducer)(AddWork);
