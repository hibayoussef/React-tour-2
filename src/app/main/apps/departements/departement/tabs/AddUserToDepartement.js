import { Fragment, useState } from "react";
import { ButtonGroup } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { addUserToDepartement } from "../../store/departementSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import FlagIcon from "@mui/icons-material/Flag";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { getUsers } from "../../store/departementSlice";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "3rem",
    maxWidth: "990px",
    minWidth: "300px",
    backgroundColor: "#ffffff",
  },
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

const AddUserToDepartement = (departmentId) => {
  console.log("departmentId: ", departmentId);
  const id = departmentId?.departmentId;
  //   console.log("log: ", invoiceId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [assignToUserDialog, setAssignToUserDialog] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const AssignToUserFullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [assignmentNote, setAssignmentNote] = useState("");
  const [ids, setIds] = useState([]);
  // const [value, setValue] = React.useState([]);
  // const [value, setValue] = useState(users)

  console.log("userrrrs value: ", users);

  useEffect(() => {
    getUsers().then((response) => {
      console.log("Users response in approve: ", response);
      setUsers(response);
    });
  }, []);
  // confirm

  console.log("users: ", users);

  const handleAssignToUserDialogOpen = () => {
    setAssignToUserDialog(true);
  };

  const handleAssignToUserDialogClose = () => setAssignToUserDialog(false);
  //   end assign to user
  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);
  const handleClickConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  //end confirm

  const handleDialogClose = () => setDialogOpen(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const rejectInvoiceHandleClick = () => {
    enqueueSnackbar(
      "Invoice rejected successfully",
      { variant: "error" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };

  const approveInvoiceHandleClick = () => {
    enqueueSnackbar(
      "Invoice approved successfully",
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
  const assignToUserToApproveInvoiceHandleClick = () => {
    enqueueSnackbar(
      "Invoice assigned to user to approved successfully",
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
      <ButtonGroup size="medium">
        <Button
          onClick={(ev) => {
            handleAssignToUserDialogOpen();
          }}
          variant="contained"
          color="secondary"
        >
          Add User to Departement
        </Button>
      </ButtonGroup>

      {/* assign to user dialog */}

      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={AssignToUserFullScreen}
        open={assignToUserDialog}
        onClose={handleAssignToUserDialogClose}
      >
        <DialogTitle
          style={{ fontWeight: "bold", fontSize: "4rem", color: "black" }}
        >
          Request to add Users to departement
        </DialogTitle>
        <div
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 10,
            padding: "2rem",
            paddingLeft: "2rem",
            marginLeft: 10,
          }}
        >
          <DialogContentText style={{ fontWeight: 600, color: "black" }}>
            {" "}
            <FlagIcon
              style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
            />
           Add a user to the Depatment.
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
          Once a user is added to the Department, he will become a follower 
          of this Department and do all his work within this Department!
          </DialogContentText>
        </div>

        <DialogTitle style={{ color: "black" }}>
          Assign a member to Department
        </DialogTitle>
        <DialogContent>
            <Autocomplete
            onChange={(event, value) => {
              console.log("dep vvv:", value);
              console.log("dep.id: ", value.id);
              setIds(value.id);
            }}
            multiple
            id="tags-outlined"
             options={users.map((option) => option.name)}
            // getOptionLabel={(option) => option.name}
            // defaultValue={[users[0].name]}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Users"
                placeholder="Choose Users"
                fullWidth
                // InputProps={{ ...params.InputProps, style: { fontSize: 17 } }}
                // InputLabelProps={{ style: { fontSize: 17 } }}
              />
            )}
          />
          {/* <Autocomplete
            id="tags-filled"
            onChange={(event, value) => {
              console.log("dep vvv:", value);
              console.log("dep.id: ", value.id);
              setIds(value.id);
              setValue(value)
            }} // prints the selected value
            // value={users || ""}
            multiple
            options={users.map((option) => option.name) || []}
            sx={{ width: 860 }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  style={{ color: "black", backgroundColor: "yello" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ color: "black" }}
                placeholder="Users"
                fullWidth
                InputProps={{ ...params.InputProps, style: { fontSize: 17 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
              />
            )}
          /> */}

          {/* <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setIds(newValue.id);
              console.log("newwwwwwww: ", newValue);
            }}
            multiple
            id="tags-filled"
            options={users.map((option) => option.name)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  style={{ color: "black", backgroundColor: "yello" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                style={{ color: "black" }}
                {...params}
                variant="filled"
                label="Users"
              />
            )}
          /> */}
        </DialogContent>

        <DialogActions>
          <div style={{ paddingRight: "1rem" }}>
            <Button
              onClick={handleAssignToUserDialogClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>

            <Button
              onClick={(ev) => {
                console.log(
                  "I am inside function: ",
                  "id: ",
                  id,
                  ",users id: ",
                  ids
                );
                dispatch(
                  addUserToDepartement({
                    id,
                    ids,
                  })
                );
                assignToUserToApproveInvoiceHandleClick(ev);
                handleAssignToUserDialogClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Add User/s
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddUserToDepartement;
