import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import reducer from "../store";
import { getReceipt } from "../store/receiptSlice";
import ReceiptDetailsTab from "./tabs/ReceiptDetailsTab";

function Receipt(props) {
  const dispatch = useDispatch();
  const receipt = useSelector(({ eCommerceApp }) => eCommerceApp.receipt);
  const theme = useTheme();

  const routeParams = useParams();
  console.log("router Params: ", routeParams.orderId);
  const [tabValue, setTabValue] = useState(0);
  const [noOrder, setNoOrder] = useState(false);

  useDeepCompareEffect(() => {
    dispatch(getReceipt(routeParams.orderId));
  }, [dispatch, routeParams.orderId]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetOrder());
  //     setNoOrder(false);
  //   };
  // }, [dispatch]);

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
          There is no such Receipt details!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/receipts/receipts"
          color="inherit"
        >
          Go to Receipts Page
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
        receipt && (
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
                  to="/apps/receipts/receipts"
                  color="inherit"
                >
                  <Icon className="text-20">
                    {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                  </Icon>
                  <span className="mx-4 font-medium">Receipts</span>
                </Typography>
              </motion.div>

              <div className="flex flex-col min-w-0 items-center sm:items-start">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                  <Typography className="text-16 sm:text-20 truncate font-semibold">
                    {`Receipt ${receipt.id}`}
                  </Typography>
                  <Typography variant="caption" className="font-medium">
                    {/* {`From ${order.user.firstName} ${order.user.lastName}`} */}
                  </Typography>
                </motion.div>
              </div>
            </div>
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
          <Tab className="h-64" label="Receipt Details" />
          {/* <Tab className="h-64" label="Products" />
          <Tab className="h-64" label="Invoice" /> */}
        </Tabs>
      }
      content={
        receipt && (
          <div className="p-16 sm:p-24 max-w-2xl w-full">
            {tabValue === 0 && <ReceiptDetailsTab />}
            {/* {tabValue === 1 && <ProductsTab />}
            {tabValue === 2 && <InvoiceTab order={order} />} */}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Receipt);
