import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { addInvoice } from "../../../store/invoiceSlice";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import { getJobs, addSalaryScale } from "../../store/salaryScaleSlice";
import { useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import Input from "@material-ui/core/Input";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";

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
  const [amountJunior, setAmountJunior] = useState("");
  const [amountSenior, setAmountSenior] = useState("");
  const [amountMidLevel, setAmountMidLevel] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  const handleAmountSeniorChange = (event) => {
    setAmountSenior(event.target.value);
  };

  const handleAmountJuniorChange = (event) => {
    setAmountJunior(event.target.value);
  };

  const handleAmountMidLevelChange = (event) => {
    setAmountMidLevel(event.target.value);
  };

  useEffect(() => {
    getJobs().then((response) => {
      console.log("jobs response in approve: ", response);
      setJobs(response);
    });
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <div className="pb-12 pt-12" key={job?.id}>
          <div className="mb-2">
            <Input
              id="input-with-icon-adornment"
              value={job?.name || ""}
              onChange={(event, value) => {
                console.log("value vvv:", value);
                console.log("value.id: ", value.id);
                setJobId(value.id);
              }}
              disableUnderline={true}
              variant="standard"
              startAdornment={
                <InputAdornment position="start">
                  <WorkOutlineOutlinedIcon />
                </InputAdornment>
              }
              style={{ fontWeight: 500 }}
            />
          </div>

          <div className="flex -mx-4 mt-7 mb-3">
            <TextField
              className="mr-5"
              id="extraShippingFee"
              variant="outlined"
              value="Senior"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTreeOutlinedIcon position="start" />
                  </InputAdornment>
                ),
                style: { fontSize: 14, fontWeight: 300 },
              }}
            />

            <TextField
              label="Amount"
              id="extraShippingFee"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={amountSenior}
              onChange={handleAmountSeniorChange}
              fullWidth
            />
          </div>

          {/* mid level */}

          <div className="flex -mx-4 mt-7">
            <TextField
              className="mr-5"
              id="extraShippingFee"
              variant="outlined"
              value="Mid Level"
              // onChange={handleNetAmountChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTreeOutlinedIcon position="start" />
                  </InputAdornment>
                ),
                style: { fontSize: 14, fontWeight: 300 },
              }}
            />

            <TextField
              label="Amount"
              id="extraShippingFee"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={amountMidLevel}
              onChange={handleAmountMidLevelChange}
              fullWidth
            />
          </div>

          {/* junior */}
          <div className="flex -mx-4 mt-7">
            <TextField
              className="mr-5"
              id="extraShippingFee"
              variant="outlined"
              value="junior"
              // onChange={handleNetAmountChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTreeOutlinedIcon position="start" />
                  </InputAdornment>
                ),
                style: { fontSize: 14 },
              }}
            />

            <TextField
              label="Amount"
              id="extraShippingFee"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={amountJunior}
              onChange={handleAmountJuniorChange}
              fullWidth
            />
          </div>
        </div>
      ))}

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
                // dispatch(addSalaryScale({ jobId, amount, employyLevel}));
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

const levels = [
  { id: 1, level: "senior" },
  { id: 2, level: "mid_level" },
  { id: 3, level: "junior" },
];
