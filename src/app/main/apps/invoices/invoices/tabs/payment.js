import _ from "@lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  getPaymentInvoices,
  selectPaymentInvoices,
} from "../../store/paymentInvoiceSlice";
import InvoicesTableHead from "../InvoicesTableHead";
import moment from "moment";
import Chip from "@mui/material/Chip";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  divider: {
    // Theme Color, or use css color in quote
    background: "#e0e0e0",
  },
}));

function PaymentTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const invoices = useSelector(selectPaymentInvoices);
  const searchText = useSelector(
    ({ invoicesApp }) => invoicesApp.paymentInvoices.searchText
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(invoices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getPaymentInvoices()).then(() => setLoading(false));
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
        <h3 style={{paddingTop: '4rem'}}>
          There are no Payment Invoices!
        </h3>
      </motion.div>
    );
  }
  return (
    <>
      <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
        <InvoicesTableHead
          selectedInvoiceIds={selected}
          order={order}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={data.length}
          onMenuItemClick={handleDeselect}
        />

        <TableBody>
          {_.orderBy(
            data,
            [
              (o) => {
                switch (order.id) {
                  case "grossAmount": {
                    return o.grossAmount[0];
                  }
                  default: {
                    return o[order.id];
                  }
                }
              },
            ],
            [order.direction]
          )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((n) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell
                    className="w-40 md:w-64 text-center"
                    padding="none"
                  >
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>

                  <TableCell
                    className="w-52 px-4 md:px-0"
                    component="th"
                    scope="row"
                    padding="none"
                  >
                    <img
                      className="w-full block rounded"
                      src="assets/images/ecommerce/invoice.png"
                      alt="invoice"
                    />
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.id}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                    {n.submittedBy.name}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate"
                    component="th"
                    scope="row"
                  >
                    <Chip
                      style={{ fontSize: "1.2rem" }}
                      icon={statusIcon(n.status)}
                      label={n.status}
                    />
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {moment(moment.utc(n.issueDate).toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <span>$</span>
                    {n.grossAmount}
                  </TableCell>

                  {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.active ? (
                        <Icon className="text-green text-20">check_circle</Icon>
                      ) : (
                        <Icon className="text-red text-20">remove_circle</Icon>
                      )}
                    </TableCell> */}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}

export default withRouter(PaymentTable);
