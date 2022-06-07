
import { ThemeProvider } from "@material-ui/core/styles";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import reducer from "../store";
import { resetOrder, getWork } from "../store/workSlice";
import WorkDetailsTab from "./tabs/WorkDetailsTab";
import AssignJobToUser from '../workDetails/tabs/AssignUserToJob';

function WorkDetails(props) {
  const dispatch = useDispatch();
  const order = useSelector(({ worksApp }) => worksApp.work);

  const mainTheme = useSelector(selectMainTheme);

  console.log("order: ", order);
  const theme = useTheme();

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noOrder, setNoOrder] = useState(false);

  useDeepCompareEffect(() => {
    dispatch(getWork(routeParams)).then((action) => {
      if (!action.payload) {
        setNoOrder(true);
      }
    });
  }, [dispatch, routeParams]);

  useEffect(() => {
    return () => {
      dispatch(resetOrder());
      setNoOrder(false);
    };
  }, [dispatch]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (noOrder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such Job!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/jobs/all"
          color="inherit"
        >
          Go to Jobs Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        order && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-1 flex-col items-center sm:items-start">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                <Typography
                  className="flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/jobs/all"
                  color="inherit"
                >
                  <Icon className="text-20">
                    {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                  </Icon>
                  <span className="mx-4 font-medium">Jobs</span>
                </Typography>
              </motion.div>

              <div className="flex flex-col min-w-0 items-center sm:items-start">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                  <Typography className="text-16 sm:text-20 truncate font-semibold">
                    {`Job  ${order?.id}`}
                  </Typography>
                  <Typography variant="caption" className="font-medium">
                    {`From ${order?.department?.users?.name }`}
                  </Typography>
                </motion.div>
              </div>


            </div>
            <ThemeProvider theme={mainTheme}>
              <AssignJobToUser idJob={order?.id} />
              </ThemeProvider>
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64" label="Job Details" />
        </Tabs>
      }
      content={
        order && (
          <div className="p-16 sm:p-24 max-w-2xl w-full">
            {tabValue === 0 && <WorkDetailsTab />}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer("worksApp", reducer)(WorkDetails);
