import { Fragment, useState } from "react";
import { ButtonGroup } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { getJobs, assignJobToUser } from "./store/usersSlice";

const useStyles = makeStyles((theme) => ({
  paper: { padding: "3rem", maxWidth: "990px", minWidth: "300px" },
  textStyle: {
    paddingLeft: "2rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  font: {
    fontSize: "5rem",
  },
}));

const AssignJobToUser = (id) => {
  const userId = id?.id;
  const [assignJobToUserDialogOpen, setAssignJobToUserDialogOpen] =
    useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const AssignToUserFullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    getJobs().then((response) => {
      console.log("jobs response in approve: ", response);
      setJobs(response);
    });
  }, []);
  // confirm

  console.log("users: ", jobs);

  //   end assign to user
  const handleClickAssignJobToUserDialogClose = () =>
    setAssignJobToUserDialogOpen(false);
  const handleClickAssignJobToUserDialogOpen = () => {
    setAssignJobToUserDialogOpen(true);
  };

  //end confirm

  const assignToUserToApproveInvoiceHandleClick = () => {
    enqueueSnackbar(
      "A Job has been successfully assigned to the user",
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
    <Fragment>
      <ButtonGroup>
        <Button
          onClick={(ev) => {
            handleClickAssignJobToUserDialogOpen();
          }}
          variant="contained"
          style={{
            paddingLeft: "2.4rem",
            paddinRight: "2.4rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            backgroundColor: "#d82c2c",
            color: "#FFFFFF",
            borderRadius: 4,
          }}
        >
          {/* <IconButton
        onClick={(ev) => {
          handleClickassignJobToUserDialogOpen();
        }}
      > */}
          <MoreHorizIcon />
          {/* </IconButton> */}
        </Button>
      </ButtonGroup>

      {/* assign to user dialog */}

      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={AssignToUserFullScreen}
        open={assignJobToUserDialogOpen}
        onClose={handleClickAssignJobToUserDialogClose}
      >
        <DialogTitle style={{ fontWeight: "bold", fontSize: "4rem" }}>
          Assign a Job to User
        </DialogTitle>

        <DialogContent>
          <Autocomplete
            id="combo-box-demo"
            onChange={(event, value) => {
              console.log("value vvv:", value);
              console.log("value.id: ", value.id);
              setJobId(value.id);
            }} // prints the selected value
            // value={users || ""}
            options={jobs || []}
            getOptionLabel={(option) => option.name || ""}
            sx={{ width: 860 }}
            defaultValue={jobs?.find((v) => v.name[0])}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Member"
                fullWidth
                InputProps={{ ...params.InputProps, style: { fontSize: 17 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
              />
            )}
          />
        </DialogContent>
        <DialogContent style={{ marginTop: "15rem", marginBottom: "10rem" }}>
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
                placeholder="Search Member"
                fullWidth
                InputProps={{ ...params.InputProps, style: { fontSize: 17 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <div style={{ paddingRight: "1rem" }}>
            <Button
              onClick={handleClickAssignJobToUserDialogClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>

            <Button
              onClick={(ev) => {
                dispatch(assignJobToUser({ userId, jobId, level }));
                assignToUserToApproveInvoiceHandleClick(ev);
                handleClickAssignJobToUserDialogClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Assign Job to user
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AssignJobToUser;

const levels = [
  { id: 1, level: "senior" },
  { id: 2, level: "mid_level" },
  { id: 3, level: "junior" },
];
