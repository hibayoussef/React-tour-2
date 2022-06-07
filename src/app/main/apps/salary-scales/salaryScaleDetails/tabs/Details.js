import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getJobs } from "../../store/salaryScalesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import { addSalaryScale, getSalaryScale } from "../../store/salaryScaleSlice";
import { useParams } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";

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

function Details(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [salaryScale, setSalaryScale] = useState();
  const routeParams = useParams();

  useEffect(() => {
    getSalaryScale(routeParams).then((response) => {
      setSalaryScale(response);
      console.log("*********: ", response);
    });
  }, []);

  console.log("salary Scale details: ", salaryScale);
  const handleCreateSalaryScaleMessageClick = () => {
    enqueueSnackbar(
      "Salary Scale has been created successfully",
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
    <div>
      {salaryScale?.salaryScaleJobs?.map((sc) => (
        <div key={sc?.id}>
          <div>
            <Tooltip title={sc?.job?.description}>
              <Input
                id="input-with-icon-adornment"
                value={sc?.job?.name || ""}
                disableUnderline={true}
                variant="standard"
                startAdornment={
                  <InputAdornment position="start">
                    <WorkOutlineOutlinedIcon />
                  </InputAdornment>
                }
              />
            </Tooltip>
          </div>
          <div className="flex -mx-4">
            <TextField
              className="mt-8 mb-16 ml-6"
              id="outlined-size-normal"
              value={sc?.employeeLevel || ""}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="mt-8 mb-16 ml-6"
              id="outlined-size-normal"
              value={sc?.amount || ""}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;
