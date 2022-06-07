import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { addWork } from "../../store/workSlice";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFromDateChange = (date) => {
    setFromDate(date);
    console.log("date issssssssss: ", date);
    console.log("date issssssssss: ", fromDate);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDepartementCreatedMessageClick = () => {
    enqueueSnackbar(
      "Leave created successfully",
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMaxNumberOfEmployeesChange = (event) => {
    setMaxNumberOfEmployees(event.target.value);
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
            label="From Date"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={fromDate}
            onChange={handleFromDateChange}
          />

          <KeyboardDatePicker
            inputVariant="outlined"
            className="mt-8 mb-16 ml-6"
            margin="normal"
            id="date-picker-dialog"
            label="To Date"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
      </MuiPickersUtilsProvider>
      <TextField
        className="mt-8 mb-16"
        label="Description"
        id="extraShippingFee"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {" "}
              <SubtitlesIcon />
            </InputAdornment>
          ),
        }}
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
      />

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
                dispatch(addWork({ fromDate, toDate, description }));
                ev.stopPropagation();
                handleDepartementCreatedMessageClick(ev);
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
