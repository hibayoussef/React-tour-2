import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { addInvoice } from "../../../store/invoiceSlice";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";

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

function ShippingTab(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [netAmount, setNetAmount] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [file, setFile] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleUploadPDFFileMessageClick = () => {
    enqueueSnackbar(
      "PDF file has been uploaded successfully",
      { variant: "success" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };

  const handleCreateInvoiceMessageClick = () => {
    enqueueSnackbar(
      "Invoice created successfully",
      { variant: "success" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };
  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (event.target && file) {
      // formData.append("invoice", file);
      setFile(file);
    }
  };
  const uploadHandler = (event) => {
    const formData = new FormData();
    formData.append("grossAmount", grossAmount);
    formData.append("taxNumber", taxNumber);
    formData.append("netAmount", netAmount);
    formData.append("issueDate", issueDate);
    formData.append("dueDate", dueDate);
    formData.append("invoice", file);

    console.log(
      " invoice grossAmount,taxNumber,netAmount,",
      file,
      grossAmount,
      taxNumber,
      netAmount
    );
    console.log("dueDate,issueDate: ", dueDate, issueDate);
    // call api
    dispatch(addInvoice(formData));
  };

  const handleissueDateChange = (date) => {
    setIssueDate(date);
    console.log("date issssssssss: ", date);
    console.log("date issssssssss: ", issueDate);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleNetAmountChange = (event) => {
    setNetAmount(event.target.value);
  };

  const handleTaxAmountChange = (event) => {
    setTaxNumber(event.target.value);
  };

  const handleGrossAmountChange = (event) => {
    setGrossAmount(event.target.value);
  };
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="flex -mx-4">
          <KeyboardDatePicker
            inputVariant="outlined"
            className="mt-8 mb-16"
            margin="normal"
            id="date-picker-dialog"
            label="issue Date"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={issueDate}
            onChange={handleissueDateChange}
          />

          <KeyboardDatePicker
            inputVariant="outlined"
            className="mt-8 mb-16 ml-6"
            margin="normal"
            id="date-picker-dialog"
            label="Due Date"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
      </MuiPickersUtilsProvider>
      <TextField
        className="mt-8 mb-16"
        label="Net Amount"
        id="extraShippingFee"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={netAmount}
        onChange={handleNetAmountChange}
        fullWidth
      />

      <TextField
        className="mt-8 mb-16"
        label="Tax Number"
        id="extraShippingFee"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={taxNumber}
        onChange={handleTaxAmountChange}
        fullWidth
      />

      <TextField
        className="mt-8 mb-16"
        label="Gross Amount"
        id="extraShippingFee"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={grossAmount}
        onChange={handleGrossAmountChange}
        fullWidth
      />

      <div className={classes.root}>
        <input
          accept="application/pdf"
          className={classes.input}
          id="contained-button-file"
          // multiple
          type="file"
          onChange={fileSelectedHandler}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component="span"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            {/* <Button variant="contained" color="primary" component="span"> */}{" "}
            Upload
          </Button>

          {/* </Button> */}
        </label>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Grid
          container
          direction="row-reverse"
          justifyContent="flex-start"
          alignItems="flex-end"
          style={{
            paddingTop: "11rem",
          }}
        >
          <Grid item>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              style={{
                padding: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
              // onClick={handleRemoveProduct}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              style={{
                padding: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
              onClick={(ev) => {
                uploadHandler();
                ev.stopPropagation();
                handleCreateInvoiceMessageClick(ev);
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
}

export default ShippingTab;
