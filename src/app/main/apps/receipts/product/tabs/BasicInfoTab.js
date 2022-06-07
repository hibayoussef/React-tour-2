import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/receiptSlice";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [users, setUsers] = useState([]);
  // const users = useSelector(selectUsers);
  // const user = useSelector(({ usersApp }) => usersApp.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    getUsers().then((response) => {
      console.log("Users response in approve: ", response);
      setUsers(response);
    });
  }, []);

  return (
    <div>
      <FormControl style={{ minWidth: "100rem" }} className={classes.margin}>
        {users.map((receipt) => {
          <NativeSelect
            id="demo-customized-select-native"
            value={receipt.name}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option value={receipt.name}>{receipt.name}</option>
          </NativeSelect>;
        })}
      </FormControl>
    </div>
  );
}

export default BasicInfoTab;
