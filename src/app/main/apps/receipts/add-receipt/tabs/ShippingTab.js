import React, { useState, useEffect } from "react";
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
// import { addReceipt } from "../../store/receiptSlice";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsers} from '../../store/receiptsSlice';

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

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    getUsers().then((response) => {
      console.log("Users response in Assssign: ", response);
      setUsers(response);
    });
  }, []);

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
        <h4
        style={{
          paddingTop: "1rem",
          paddingBottom: "2rem",
          fontWeight: "500",
        }}
      >
        Choose the user for whom you want to create a new receipt
      </h4>

      <Autocomplete
        id="combo-box-demo"
        onChange={(event, value) => {
          console.log("value vvv:", value);
          console.log("value.id: ", value.id);
          setUserId(value.id);
        }} // prints the selected value
        // value={users || ""}
        options={users || []}
        getOptionLabel={(option) => option.name || ""}
        sx={{ width: 860 }}
        // defaultValue={users?.find((v) => v.name[0])}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose User"
            variant="outlined"
            fullWidth
            InputProps={{ ...params.InputProps, style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
          />
        )}
      />

      <h4
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          fontWeight: "500",
        }}
      >
        Salary
      </h4>
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
        label="Bonus"
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

      <TextField
        className="mt-8 mb-16"
        label="allowance"
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
      <h4
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          fontWeight: "500",
        }}
      >
        Deductions
      </h4>
      <TextField
        className="mt-8 mb-16"
        label="amount"
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

      <TextField
        className="mt-8 mb-16"
        label="reason"
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
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, value) => {
          console.log("value vvv:", value);
          console.log("value.id: ", value.level);
          setLevel(value.level);
        }} // prints the selected value
        // value={users || ""}
        options={levels || []}
        getOptionLabel={(option) => option.level || ""}
        sx={{ width: 860 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose Level"
            variant="outlined"
            fullWidth
            InputProps={{ ...params.InputProps, style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
          />
        )}
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
                // dispatch(addReceipt({ fromDate, toDate, description }));
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

const levels = [
  { id: 1, level: "senior" },
  { id: 2, level: "mid_level" },
  { id: 3, level: "junior" },
];
