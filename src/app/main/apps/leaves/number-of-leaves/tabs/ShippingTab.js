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
import { addLeave } from "../../store/leaveSlice";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getCategories, getUsers } from "../../store/leavesSlice";
import { useEffect } from "react";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DialogContentText from "@material-ui/core/DialogContentText";
import FlagIcon from "@material-ui/icons/Flag";

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
  const [numberOfDaysAllowed, setNumberOfDaysAllowed] = useState("");
  const [categories, setCategories] = useState([]);
  const [leaveCategoryId, setLeaveCategoryId] = useState(0);
  const [users, setUsers] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFromDateChange = (date) => {
    setFromDate(date);
    console.log("date issssssssss: ", date);
    console.log("date issssssssss: ", fromDate);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleNumberOfDaysAllowedChange = (event) => {
    setNumberOfDaysAllowed(event.target.value);
  };

  useEffect(() => {
    getCategories().then((response) => {
      console.log("getCategories response in approve: ", response);
      setCategories(response);
    });
  }, []);

  useEffect(() => {
    getUsers().then((response) => {
      console.log("getUserssssss: ", response);
      setUsers(response);
    });
  }, []);

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

  return (
    <>
      <div
        style={{
          backgroundColor: "#F8F9FA",
          borderRadius: 10,
          marginLeft: 10,
        }}
      >
        <DialogContentText
          style={{ fontWeight: 600, padding: "2rem", paddingLeft: "2rem" }}
        >
          {" "}
          <FlagIcon
            style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
          />
          You must fill in all fields <span style={{ color: "red" }}>But</span>
        </DialogContentText>
        <DialogContentText
          style={{
            paddingRight: "2rem",
            paddingLeft: "2rem",
            paddingBottom: "2rem",
          }}
        >
          before u create leave u must check of the number of Leaves that
          remains from your available leaves
        </DialogContentText>
      </div>

      <div className="mt-10">
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
          sx={{ width: 900 }}
          // defaultValue={departments?.find((v) => v.title[0])}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search User"
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: { fontSize: 15 },
                startAdornment: (
                  <InputAdornment position="start">
                    <PostAddIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: 15 } }}
            />
          )}
        />
      </div>

      <br />

      <TextField
        className="mt-8 mb-16"
        label="numbers of days allowed"
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
        value={numberOfDaysAllowed}
        onChange={handleNumberOfDaysAllowedChange}
        fullWidth
      />
      <div className="mt-10">
        <Autocomplete
          id="combo-box-demo"
          onChange={(event, value) => {
            console.log("value vvv:", value);
            console.log("value.id: ", value.id);
            setLeaveCategoryId(value.id);
          }} // prints the selected value
          // value={users || ""}

          options={categories || []}
          getOptionLabel={(option) => option.name || ""}
          sx={{ width: 900 }}
          // defaultValue={departments?.find((v) => v.title[0])}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search Category"
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: { fontSize: 15 },
                startAdornment: (
                  <InputAdornment position="start">
                    <PostAddIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: 15 } }}
            />
          )}
        />
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
                dispatch(
                  addLeave({
                    leaveCategoryId,
                    numberOfDaysAllowed,
                    fromDate,
                    toDate,
                  })
                );
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
