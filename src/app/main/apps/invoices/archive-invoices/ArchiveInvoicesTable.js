import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import { getInvoices, selectInvoices } from "../store/invoicesSlice";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CompleteTable from "./tabs/complete";
import RejectedTable from "./tabs/rejected";

const useStyles = makeStyles(() => ({
  divider: {
    // Theme Color, or use css color in quote
    background: "#e0e0e0",
  },
}));

function InvoicesTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const searchText = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices.searchText
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(invoices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    dispatch(getInvoices()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(invoices, (item) => item.issueDate.includes(searchText))
      );
      setPage(0);
    } else {
      setData(invoices);
    }
  }, [invoices, searchText]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const statusIcon = (status) => {
    switch (status) {
      case "approval_pending":
        return <VerifiedUserIcon />;
      case "review_pending":
        return <VisibilityIcon />;
      case "payment_pending":
        return <CreditCardIcon />;
      case "completed":
        return <CheckCircleIcon />;
      case "rejected":
        return <CancelIcon />;
      default:
        return <CancelIcon />;
    }
  };

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no Invoices!
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          {/* tabs */}
          <Paper
            square
            style={{ backgroundColor: "#f6f7f9", padding: "1.3rem" }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="disabled tabs example"
            >
              <Tab label="Completed" />
              <Tab label="Rejected" />
            </Tabs>
          </Paper>
          {/* end tabs */}
          <Divider classes={{ root: classes.divider }} />
          <div className={tabValue !== 0 ? "hidden" : ""}>
            <CompleteTable />
          </div>

          <div className={tabValue !== 1 ? "hidden" : ""}>
            <RejectedTable />
          </div>

          <div className={tabValue !== 4 ? "hidden" : ""}>
            <CompleteTable />
          </div>
        </FuseScrollbars>

        <TablePagination
          className="flex-shrink-0 border-t-1"
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default withRouter(InvoicesTable);
