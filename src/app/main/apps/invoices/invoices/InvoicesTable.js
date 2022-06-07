import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Typography";
import Typography from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import { getInvoices, selectInvoices } from "../store/invoicesSlice";
import InvoicesTableHead from "./InvoicesTableHead";
import moment from "moment";
import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";
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
import AllTable from "./tabs/all";
import ReviewTable from "./tabs/review";
import ApprovalTable from "./tabs/approval";
import PaymentTable from "./tabs/payment";

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

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/apps/invoices-section/invoices/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

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
        <h2>There are no Invoices!</h2>
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
              <Tab label="All" />
              <Tab label="Review" />
              <Tab label="Approval" />
              <Tab label="Payment" />
            </Tabs>
          </Paper>
          {/* end tabs */}
          <Divider classes={{ root: classes.divider }} />

          <div className={tabValue !== 0 ? "hidden" : ""}>
            <AllTable />
          </div>
          <div className={tabValue !== 1 ? "hidden" : ""}>
            <ReviewTable />
          </div>
          <div className={tabValue !== 2 ? "hidden" : ""}>
            <ApprovalTable />
          </div>
          <div className={tabValue !== 3 ? "hidden" : ""}>
            <PaymentTable />
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
