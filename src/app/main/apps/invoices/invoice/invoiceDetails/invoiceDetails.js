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
import Divider from "@material-ui/core/Divider";

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
  const [invoice, setInvoice] = useState({});
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [iban, setIban] = useState(invoice?.beneficiary?.iban || "");
  const [grossAmount, setGrossAmount] = useState(invoice?.grossAmount);

  useEffect(() => {
    getInvoice(routeParams).then((response) => {
      for (const { key, value, label } of invoice?.dataBoxes) {
        if (label === "invoice") invoice[key] || value;
        else {
          if (!invoice[label]) invoice[label] = {};
          invoice[label][key] = invoice[label][key] || value;
        }
      }
      setInvoice(response);
    });
  }, []);

  // beneficiery
  let { beneficiary } = invoice;

  beneficiary = {
    beneficiaryName: "Beta apps LLC",
    iban: "AE850260001015689723401",
    accountNumber: "",
    swiftCode: "EBILAEAD",
    bankName: "EMIRATES NBD BANK PJSC",
    bankCode: "EBIL",
    branchName: "branch1",
    branchAddress: "branch1address",
    branchCode: "",
    clearanceCode: "",
  };

  invoice.beneficiary = beneficiary;

  // OCR
  let dataBoxes = [
    {
      key: "beneficiaryName",
      value: "Beta",
    },
    {
      key: "iban",
      value: "AE103829101013",
    },
    {
      key: "accountNumber",
      value: "19235221235547",
    },
    {
      key: "swiftCode",
      value: "EBILAEADEBILAEADEBILAEAD",
    },
    {
      key: "bankName",
      value: "London",
    },
    {
      key: "bankCode",
      value: "EBILEBILEBIL",
    },
    {
      key: "branchName",
      value: "branch1branch1branch1",
    },
    {
      key: "branchAddress",
      value: "branch1addressbranch1address",
    },
    {
      key: "branchCode",
      value: "aaaaaaaaaaa",
    },
    {
      key: "clearanceCode",
      value: "bbbbbbbbbbbb",
    },
  ];

  invoice.dataBoxes = dataBoxes;

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

  const statusGropButton = (status, id) => {
    switch (status) {
      case "review_pending":
        return (
          <GroupButttonReviewStatus
            id={id}
            invoice={invoice}
            grossAmount={+grossAmount}
            iban={iban}
          />
        );
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
            data={invoice?.file?.url}
            // data="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={invoice?.file?.url}>to the PDF!</a>
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
                  value={invoice?.netAmount || ""}
                  name={"netAmount"}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
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
                  variant="outlined"
                  fullWidth
                  value={invoice?.taxNumber || ""}
                  // onChange={onChange}
                  // name={"taxNumber"}
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
                  variant="outlined"
                  fullWidth
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                  // name={"grossAmount"}
                />
              </Grid>
            </Grid>

            <br />
            <br />
            <Divider />
            <br />
            <br />
            <h2 style={{ fontWeight: 700 }}>Beneficiary Details</h2>
            <br />
            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Beneficiary Name</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  variant="outlined"
                  fullWidth
                  // ----
                  value={invoice?.beneficiary?.beneficiaryName || ""}
                  // onChange={onChange}
                  // name={"beneficiary.beneficiaryName"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>IBAN</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={iban}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setIban(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Account Number</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  // value={beneficiary.accountNumber || ""}
                  value={invoice?.beneficiary?.accountNumber || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.accountNumber"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Swift Code</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.swiftCode || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.swiftCode"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Bank Name</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.bankName || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.bankName"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Bank Code</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.bankCode || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.bankCode"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Branch Name</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.branchName || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.branchName"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Branch Address</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.branchAddress || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.branchAddress"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Branch Code</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice?.beneficiary?.branchCode || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.branchCode"}
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={4}
                sm={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Clearance Code</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  // value={beneficiary.clearanceCode || ""}
                  value={invoice?.beneficiary?.clearanceCode || ""}
                  variant="outlined"
                  fullWidth
                  // onChange={onChange}
                  // name={"beneficiary.clearanceCode"}
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
