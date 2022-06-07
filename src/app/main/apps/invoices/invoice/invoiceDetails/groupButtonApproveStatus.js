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
import {
  rejectInvoice,
  approveInvoice,
  assignToUser,
} from "../../store/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import FlagIcon from "@mui/icons-material/Flag";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { getUsers } from "../../store/invoiceSlice";
import { useEffect } from "react";

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

const GroupButttonApproveStatus = (id) => {
  console.log("id inside approve file: ", id);
  const invoiceId = id?.id;
  console.log("log: ", invoiceId);
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
  const [userId, setUserId] = useState(0);

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
            handleClickConfirmDialogOpen();
          }}
        >
          Approve
        </Button>
        <Button
          onClick={(ev) => {
            handleClickOpen();
          }}
        >
          Reject
        </Button>
        <Button
          onClick={(ev) => {
            handleAssignToUserDialogOpen();
          }}
        >
          Assign to User to approve
        </Button>
      </ButtonGroup>
      {/* reject Dialog */}
      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle style={{ fontWeight: "bold" }}>Reject Invoice</DialogTitle>
        <DialogContent>
          <div
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 10,
              padding: "3rem",
            }}
          >
            <DialogContentText>
              <FlagIcon
                style={{ fontSize: 40, color: "#dc3c24", paddingRight: "1rem" }}
              />
              Do you really want to reject this invoice ?
            </DialogContentText>
            <DialogContentText>
              <FlagIcon
                style={{ fontSize: 40, color: "#F8F9FA", paddingRight: "1rem" }}
              />
              Keep in mind that once the invoice is rejected you won’t be able
              to proceed with it.
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ paddingRight: "1rem" }}>
            <Button
              onClick={handleClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={(ev) => {
                dispatch(rejectInvoice(invoiceId));
                rejectInvoiceHandleClick(ev);
                handleClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Reject Invoice
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* End reject Dialog */}

      {/* Confirm Dialog */}
      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={fullScreen}
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
      >
        <DialogTitle style={{ fontWeight: "bold" }}>
          Approve Invoice
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 10,
              padding: "3rem",
            }}
          >
            <DialogContentText>Almost ready for payment !</DialogContentText>
            <DialogContentText>
              By confirming you mark this invoice ready for approval.
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ paddingRight: "1rem" }}>
            <Button
              onClick={handleConfirmDialogClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={(ev) => {
                dispatch(approveInvoice(invoiceId));
                approveInvoiceHandleClick(ev);
                handleConfirmDialogClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              yes, Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* End Confirm Dialog */}

      {/* assign to user dialog */}

      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={AssignToUserFullScreen}
        open={assignToUserDialog}
        onClose={handleAssignToUserDialogClose}
      >
        <DialogTitle style={{ fontWeight: "bold", fontSize: "4rem" }}>
          Request approval
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
          <DialogContentText style={{ fontWeight: 600 }}>
            {" "}
            <FlagIcon
              style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
            />
            Send an invoice approval request to a team member.
          </DialogContentText>
          <DialogContentText>
            The assigned member will receive a notification asking them to
            approve this invoice. Once they accept, payment is on the way!
          </DialogContentText>
        </div>

        <DialogTitle>Assign a member to approve</DialogTitle>
        <DialogContent>
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
            defaultValue={users?.find((v) => v.name[0])}
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
        <DialogContent style={{ marginTop: "15rem" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              value={assignmentNote}
              onChange={(e) => setAssignmentNote(e.target.value)}
              id="outlined-basic"
              variant="outlined"
              placeholder="Add a message"
              fullWidth
              size="medium"
              InputProps={{ style: { fontSize: 17 } }}
              InputLabelProps={{ style: { fontSize: 17 } }}
            />
          </form>
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
                  invoiceId,
                  ",users id: ",
                  userId,
                  ",assignmentNote:",
                  assignmentNote
                );
                dispatch(assignToUser({ invoiceId, userId, assignmentNote }));
                assignToUserToApproveInvoiceHandleClick(ev);
                handleAssignToUserDialogClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Assign to approve
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default GroupButttonApproveStatus;
