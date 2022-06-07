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
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDepartments } from "../store/categoriesSlice";
import { useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { Controller, useForm } from "react-hook-form";
import {addCategoryLeave} from '../store/categorySlice';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography';
import ClassIcon from '@material-ui/icons/Class';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const useStyles = makeStyles((theme) => ({
    
  paper: { padding: "4rem", maxWidth: "990px", minWidth: "300px" },
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

const AddDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [assignToUserDialog, setAssignToUserDialog] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [name, setName] = useState("");
  const [deductionAmount, setDeductionAmount] = useState(0);
  


 
 
  const handleDialogClose = () => setDialogOpen(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };


  const handleNameChange =(e) =>{
    setName(e.target.value)
  }
  const handleDeductionAmountChange =(e) =>{
    setDeductionAmount(e.target.value)
  }

   const addJobHandleClick = () => {
    enqueueSnackbar(
      "Job added successfully",
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
      <ButtonGroup size="medium">
       
        <Button
          onClick={(ev) => {
            handleClickOpen();
          }}
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
          
        >
          Add new Category 
        </Button>
       
      </ButtonGroup>


      {/* assign to user dialog */}

      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth="sm"
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "10rem", marginBottom: '2rem', color: "#212529" }}>
      
        
         Add Category Leave
        </DialogTitle>
        <div
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <DialogContentText style={{ fontWeight: 600, paddingLeft: "2rem", paddingRight: "2rem" }}>
            {" "}
            <FlagIcon
              style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
            />
            You must fill in all fields
            
          </DialogContentText>
          <DialogContentText  style={{ paddingRight: "2rem", paddingLeft: "2rem", paddingBottom: '2rem' }}>When you add a Category Leave, you enter a new Category on the Leaves Section.
          </DialogContentText>
        </div>

        <DialogContent style={{ marginTop: "6rem" }}>
        <div className="flex">
           
        
                <TextField
                  value={name} 
                  onChange={handleNameChange}
                  className="mb-24"
                  label="Name"
                  id="name"
                  variant="outlined"
                  required
                  fullWidth
                  color= 'primary'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ClassIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              
              
          </div>
          <div className="flex">
          <TextField
                  value={deductionAmount} 
                  onChange={handleDeductionAmountChange}
                  className="mb-24"
                  label="Deduction Amount"
                  id="deductionAmount"
                  variant="outlined"
                  required
                  fullWidth
                  color= 'primary'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IndeterminateCheckBoxIcon />
                      </InputAdornment>
                    ),
                  }}
                />
        
          </div>


        
  
        </DialogContent>

    
       
        <DialogActions>
          <div style={{ paddingRight: "1rem" , paddingTop: '2rem'}}>
            <Button
              onClick={handleDialogClose}
              style={{ color: "#dc3c24", fontWeight: 500 }}
              autoFocus
            >
              Cancel
            </Button>

            <Button

                onClick={(ev) => {
                    ev.stopPropagation();
                    addJobHandleClick(ev);
                    dispatch(addCategoryLeave({ name, deductionAmount }));
                    handleDialogClose()
                  }}
           
              style={{ color: "#212529", fontWeight: 500 }}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
