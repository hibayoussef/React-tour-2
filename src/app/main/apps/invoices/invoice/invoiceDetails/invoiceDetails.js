import React from "react";
import { getInvoice } from "../../store/invoiceSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles } from "@material-ui/core/styles";
import RejectDialog from "./rejectDialog";
import GroupButton from "./groupButttonReviewStatus";
import GroupButttonReviewStatus from "./groupButttonReviewStatus";
import GroupButttonApproveStatus from "./groupButtonApproveStatus";
import GroupButttonPaymentStatus from "./groupButtonPaymentStatus";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    // padding: theme.spacing(4),
  },
}));

const InvoiceDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const routeParams = useParams();
  const [invoice, setInvoice] = useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    getInvoice(routeParams).then((response) => {
      setInvoice(response);
    });
  }, []);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  console.log("invoice url: ", invoice?.file?.url);
  console.log("invoice tara : ", invoice);

  const statusGropButton = (status, id) => {
    switch (status) {
      case "review_pending":
        return <GroupButttonReviewStatus id={id} />;
      case "approval_pending":
        return <GroupButttonApproveStatus id={id} />;
      case "payment_pending":
        return <GroupButttonPaymentStatus id={id} />;
      case "rejected":
        return <GroupButton id={id} />;
      default:
        return;
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sm={7}>
          {/* pdf viewer */}
          <object
            // data={invoice?.file?.url}
            data="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf">
                to the PDF!
              </a>
            </p>
          </object>
        </Grid>

        <Grid item xs={5} sm={5} style={{ padding: "4rem" }}>
          <Grid item>
            <h1 style={{ fontWeight: "bold" }}>Invoice Details</h1>
          </Grid>

          <Grid item style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <Grid item style={{ marginBottom: 10 }}>
              <h3>From</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.name || ""}</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.email || ""}</h3>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Invoice ID</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.id || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Issue Date</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={
                    moment(moment.utc(invoice.issueDate).toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss") || ""
                  }
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <TodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Due Date</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={
                    moment(moment.utc(invoice.dueDate).toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss") || ""
                  }
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <TodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Net Amount</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.netAmount || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Tax Number</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.taxNumber || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Gross Amount</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice.grossAmount || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "3rem" }}
            >
              <Grid item>{statusGropButton(invoice.status, invoice?.id)}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
