import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { addInvoice } from "../../../store/invoiceSlice";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import { FieldArray, Field, Form, Formik } from "formik";
import { Card, CardContent } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUsers, getCategories } from "../../store/leavesSlice";
import { addNumberOfLeaves } from "../../store/leaveSlice";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FlagIcon from "@material-ui/icons/Flag";
import InputAdornment from "@material-ui/core/InputAdornment";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from "@material-ui/icons/Category";

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
  // const [amount, setAmount] = useState("");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [employeeLevel, setEmployeeLevel] = React.useState("");

  // const [employeeLevel, setEmployeeLevel] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCreateSalaryScaleMessageClick = () => {
    enqueueSnackbar(
      "Number of Leaves Created successfully", 
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

  useEffect(() => {
    getUsers().then((response) => {
      console.log("jobs response in approve: ", response);
      setUsers(response);
    });
  }, []);

  useEffect(() => {
    getCategories().then((response) => {
      console.log("Categories response in approve: ", response);
      setCategories(response);
    });
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        // userId,
        userLeavesCategories: [{ leaveCategoryId: 0, numberOfDaysAllowed: 0 }],
      }}
      onSubmit={async (values) => {
        const formatedEntities = values.userLeavesCategories.map((en) => {
          // this to formate data to be like api payload
          const formatedItem = {};
          if (en?.leaveCategoryId)
            formatedItem.leaveCategoryId = en?.leaveCategoryId.id;
          if (en?.numberOfDaysAllowed)
            formatedItem.numberOfDaysAllowed = en?.numberOfDaysAllowed;
          // if (userId) formatedItem.userId = userId;
          return formatedItem;
        });

        dispatch(
          addNumberOfLeaves({ userId, userLeavesCategories: formatedEntities })
        );
      }}
    >
      {({ values, isSubmitting, handleChange, setFieldValue }) => (
        <Form autoComplete="off">
          <div
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 10,
              marginLeft: 15,
              marginRight: "3rem",
              padding: "3rem",
              marginBottom: "6rem",
            }}
          >
            <h4
              style={{
                fontWeight: 600,
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              {" "}
              <FlagIcon
                style={{ fontSize: 40, color: "#aacc00", paddingRight: "1rem" }}
              />
              You must fill in all fields{" "}
            </h4>
          </div>

          <Grid container>
            <Grid item>
              <FieldArray name="userLeavesCategories">
                {({ push, remove }) => (
                  <>
                    <Grid item style={{ padding: "1rem" }}>
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
                        sx={{ width: 900 }}
                        // defaultValue={departments?.find((v) => v.title[0])}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Search User"
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              style: { fontSize: 15 },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{ style: { fontSize: 15 } }}
                          />
                        )}
                      />
                    </Grid>
                    {values?.userLeavesCategories.map((_, index) => (
                      <Grid
                        container
                        direction="column"
                        item
                        style={{ paddingTop: "1.3rem" }}
                        key={index}
                      >
                        {/* <Grid item style={{ paddingLeft: "1rem" }}>
                          <h3>Add a salary scale for the job you want:</h3>
                        </Grid> */}

                        <Grid item container direction="row">
                          <Grid item style={{ padding: "1rem" }}>
                            <Field
                              name={`userLeavesCategories[${index}].numberOfDaysAllowed`}
                              id={`userLeavesCategories[${index}].numberOfDaysAllowed`}
                              component={TextField}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {" "}
                                    <SubtitlesIcon />
                                  </InputAdornment>
                                ),
                              }}
                              type="number"
                              label="numberOfDaysAllowed"
                              variant="outlined"
                              fullWidth
                              style={{ width: 440 }}
                            />
                          </Grid>

                          <Grid item style={{ padding: "1rem" }}>
                            <Autocomplete
                              id={`userLeavesCategories[${index}].leaveCategoryId`}
                              name={`userLeavesCategories[${index}].leaveCategoryId`}
                              options={categories}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, value) => {
                                // console.log("jobId value: ", value);
                                setFieldValue(
                                  `userLeavesCategories[${index}].leaveCategoryId`,
                                  value
                                );
                              }}
                              style={{ width: 440 }}
                              // loading={loading}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  // onChange={handleChange}
                                  label="Choose Category"
                                  InputProps={{
                                    ...params.InputProps,
                                    style: { fontSize: 15 },
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CategoryIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  // value={values?.level}
                                  // name={`entities.${index}.employeeLevel`}
                                  variant="outlined"
                                  fullWidth
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                        >
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button
                              onClick={() =>
                                push({
                                  userId: 0,
                                  leaveCategoryId: 0,
                                  numberOfDaysAllowed: 0,
                                })
                              }
                              style={{
                                color: "black",
                                fontWeight: "500",
                                fontSize: "1.3rem",
                              }}
                            >
                              Add
                            </Button>

                            <Button
                              onClick={() => remove(index)}
                              style={{
                                color: "red",
                                fontWeight: "500",
                                fontSize: "1.3rem",
                              }}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              </FieldArray>
            </Grid>
          </Grid>

          {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
          {/* <Button type="submit" variant="contained">
            Submit
          </Button> */}

          <Grid
            item
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ padding: "10rem" }}
          >
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              type="submit"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              style={{
                padding: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
              onClick={(ev) => {
                ev.stopPropagation();
                handleCreateSalaryScaleMessageClick(ev);
              }}
            >
              Save
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ShippingTab;
