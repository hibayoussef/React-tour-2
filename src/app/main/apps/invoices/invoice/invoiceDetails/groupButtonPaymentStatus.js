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
import { rejectInvoice, markAsPaid } from "../../store/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import FlagIcon from "@mui/icons-material/Flag";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: { padding: "3rem", maxWidth: "990px", minWidth: "300px" },
  textStyle: {
    paddingLeft: "2rem",
  },
}));

const GroupButttonPaymentStatus = (id) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  // confirm
  const handleConfirmDialogOpen = () => setConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);
  const handleClickConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };
  //end confirm

  const handleDialogOpen = () => setDialogOpen(true);
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

  const markAsPaidInvoiceHandleClick = () => {
    enqueueSnackbar(
      "Invoice Marked as paid successfully",
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
      <ButtonGroup color="primary" size="large">
        <Button
          onClick={(ev) => {
            handleClickConfirmDialogOpen();
          }}
        >
          Mark as Paid
        </Button>
        <Button
          onClick={(ev) => {
            handleClickOpen();
          }}
        >
          Reject
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
                dispatch(rejectInvoice(id?.id));
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
        <DialogTitle style={{ fontWeight: "bold" }}>Mark as paid!</DialogTitle>
        <DialogContent>
          <div
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 10,
              padding: "3rem",
            }}
          >
            <DialogContentText>
              Are you sure you want to make payment status paid?
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
                dispatch(markAsPaid(id?.id));
                markAsPaidInvoiceHandleClick(ev);
                handleConfirmDialogClose();
              }}
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Yes, Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* End Confirm Dialog */}
    </Fragment>
  );
};

export default GroupButttonPaymentStatus;
