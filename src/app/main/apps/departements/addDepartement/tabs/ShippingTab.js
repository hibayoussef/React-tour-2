import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { addDepartement } from "../../store/departementSlice";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

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

  const [title, setTitle] = useState("");
  const [maxNumberOfEmployees, setMaxNumberOfEmployees] = useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDepartementCreatedMessageClick = () => {
    enqueueSnackbar(
      "Departement created successfully",
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
      <TextField
        className="mt-8 mb-16"
        label="Title"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubtitlesIcon />
            </InputAdornment>
          ),
        }}
        value={title}
        onChange={handleTitleChange}
        fullWidth
      />

      <TextField
        className="mt-8 mb-16"
        label="Max Number Of Employees"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FormatListNumberedIcon />
            </InputAdornment>
          ),
        }}
        value={maxNumberOfEmployees}
        onChange={handleMaxNumberOfEmployeesChange}
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
                console.log(
                  "I am inside dep: ",
                  "title: ",
                  title,
                  ",maxNumberOfEmployees: ",
                  maxNumberOfEmployees
                );
                dispatch(addDepartement({ maxNumberOfEmployees, title }));
                ev.stopPropagation();
                // handleDepartementCreatedMessageClick(ev);
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
