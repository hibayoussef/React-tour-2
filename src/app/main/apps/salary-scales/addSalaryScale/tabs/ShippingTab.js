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
import { getJobs, addSalaryScale } from "../../store/salaryScaleSlice";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FlagIcon from '@material-ui/icons/Flag';

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

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [employeeLevel, setEmployeeLevel] = React.useState("");

  // const [employeeLevel, setEmployeeLevel] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCreateSalaryScaleMessageClick = () => {
    enqueueSnackbar(
      "Salary Scale created successfully",
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
    getJobs().then((response) => {
      console.log("jobs response in approve: ", response);
      setJobs(response);
    });
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        entities: [{ jobId: 0, amount: 0, employeeLevel: "" }],
      }}
      onSubmit={async (values) => {
        const formatedEntities = values.entities.map((en) => {
          // this to formate data to be like api payload
          const formatedItem = {};
          if (en?.job?.id) formatedItem.jobId = en?.job?.id;
          if (en?.employeeLevel?.level)
            formatedItem.employeeLevel = en?.employeeLevel?.level;
          if (en.amount) formatedItem.amount = en.amount;
          return formatedItem;
        });

        dispatch(addSalaryScale({ entities: formatedEntities }));
      }}
    >
      {({ values, isSubmitting, handleChange, setFieldValue }) => (
        <Form autoComplete="off">
         
              <div
                    style={{
                        backgroundColor: "#F8F9FA",
                        borderRadius: 10,
                        marginLeft: 15,
                        marginRight: '3rem',
                        padding: '3rem', 
                        marginBottom: '6rem'
                    }}
                >
                    <h4 style={{fontWeight: 600, paddingLeft: "2rem", paddingRight: "2rem",}}>
                        {" "}
                        <FlagIcon
                            style={{fontSize: 40, color: "#aacc00", paddingRight: "1rem"}}
                        />
                       When creating a Job, you must create a salary scale for that Job.

                    </h4>
                    <h3 style={{paddingRight: "2rem", paddingLeft: "2rem", paddingBottom: '2rem'}}>
                       You must fill in all fields.
                    </h3>
                </div>


          <Grid container>
            <Grid item>
              <FieldArray name="entities">
                {({ push, remove }) => (
                  <>
                    {values?.entities.map((_, index) => (
                      <Grid
                        container
                        direction="column"
                        item
                        style={{ paddingTop: "1.3rem" }}
                        key={index}
                      >
                        <Grid item style={{ paddingLeft: "1rem" }}>
                          <h3>Add a salary scale for the job you want:</h3>
                        </Grid>
                        <Grid item style={{ padding: "1rem" }}>
                          <Autocomplete
                            id={`entities[${index}].job`}
                            name={`entities[${index}].job`}
                            options={jobs}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                              setFieldValue(`entities[${index}].job`, value);
                            }}
                            style={{ width: 900 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                // onChange={handleChange}
                                label="Choose Job"
                                // name={`entities.${index}.jobId`}
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>

                        <Grid item container direction="row">
                          <Grid item style={{ padding: "1rem" }}>
                            <Field
                              name={`entities[${index}].amount`}
                              id={`entities[${index}].amount`}
                              component={TextField}
                              onChange={handleChange}
                              type="number"
                              label="amount"
                              variant="outlined"
                              fullWidth
                              style={{ width: 440 }}
                            />
                          </Grid>

                          <Grid item style={{ padding: "1rem" }}>
                            <Autocomplete
                              id={`entities[${index}].employeeLevel`}
                              name={`entities[${index}].employeeLevel`}
                              options={levels}
                              getOptionLabel={(option) => option.level}
                              onChange={(event, value) => {
                                // console.log("jobId value: ", value);
                                setFieldValue(
                                  `entities[${index}].employeeLevel`,
                                  value
                                );
                              }}
                              style={{ width: 440 }}
                              // loading={loading}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  // onChange={handleChange}
                                  label="Choose Employee Level"
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
                                push({ jobId: 0, amount: 0, employeeLevel: "" })
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

const levels = [
  { id: 1, level: "senior" },
  { id: 2, level: "mid_level" },
  { id: 3, level: "junior" },
];
