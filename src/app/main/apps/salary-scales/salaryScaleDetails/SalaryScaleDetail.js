import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  resetSalaryScale,
  newSalaryScale,
  getSalaryScale,
} from "../store/salaryScaleSlice";
import reducer from "../store";
import SalaryScaleDetailHeader from "./SalaryScaleDetailHeader";
import Details from "../salaryScaleDetails/tabs/Details";

function SalaryScaleDetail(props) {
  const dispatch = useDispatch();

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<SalaryScaleDetailHeader />}
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
          <Tab className="h-64" label="Salary Scales Details" />
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24 max-w-2xl">
          <div className={tabValue !== 0 ? "hidden" : ""}>
            <Details />
          </div>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("salaryScalesApp", reducer)(SalaryScaleDetail);
