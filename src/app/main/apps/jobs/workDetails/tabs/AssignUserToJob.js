
import {  useState, useEffect } from "react";
import React from "react";
import { ButtonGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsers } from "../../store/worksSlice";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import { assignJobToUser  } from '../../store/workSlice'

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

const AssignJobToUser = (idJob) => {
    console.log('idJob:', idJob)
    const jobId = idJob?.idJob;
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0);
  const [level, setLevel] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  //   const jobDialog = useSelector(({ jobsApp }) => worksApp.works);
  const [departmentId, setDepartmentId] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
// ----------------------------------------------
  

  useEffect(() => {
    getUsers().then((response) => {
      console.log("Users response in Assssign: ", response);
      setUsers(response);
    });
  }, []);
  // confirm

  console.log("users: ", users);
 
  const handleDialogClose = () => setDialogOpen(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };


  const handleNameChange =(e) =>{
    setName(e.target.value)
  }
  const handleDescriptionChange =(e) =>{
    setDescription(e.target.value)
  }
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
          Assign Job to User 
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
      
        
        Assign a Job to User
        </DialogTitle>
        <div
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <DialogContentText style={{ fontWeight: 600,  padding: "2rem", paddingLeft: "2rem" }}>
            {" "}
            <FlagIcon
              style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
            />
            You must fill in all fields
            
          </DialogContentText>
          <DialogContentText  style={{ paddingRight: "2rem", paddingLeft: "2rem", paddingBottom: '2rem' }}>When you add a job, you enter a new job on the project, choose the correct job name and add it to the Department you want
          </DialogContentText>
        </div>

        <DialogContent style={{ marginTop: "6rem" }}>
        <div>

        <Autocomplete
            id="combo-box-demo"
            onChange={(event, value) => {
              console.log("value vvv:", value);
              console.log("value.id: ", value.id);
              setId(value.id);
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
        </div>

       
<div  className="mt-10" >
         
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
                  console.log('userId: jobId: level: ', id, jobId, level)
                    dispatch(assignJobToUser({ id, jobId, level }));
                    assignToUserToApproveInvoiceHandleClick(ev);
                    handleDialogClose();
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

export default AssignJobToUser;

const levels = [
    { id: 1, level: "senior" },
    { id: 2, level: "mid_level" },
    { id: 3, level: "junior" },
  ];
  