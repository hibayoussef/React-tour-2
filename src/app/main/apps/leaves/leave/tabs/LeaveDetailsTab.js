import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GoogleMap from "google-map-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LeavesStatus from "../LeavesStatus";
import moment from "moment";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { approveLeave, rejectLeave } from "../../store/leavesSlice";
import { useDispatch } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";

function LeaveDetailsTab() {
  const dispatch = useDispatch();
  const order = useSelector(({ leavesApp }) => leavesApp.leave);
  console.log("order details: ", order);
  console.log("orty: ", order?.data?.requester?.associatedRoles?.role?.roleId);

  const [map, setMap] = useState("shipping");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleApproveLeaveClick = () => {
    enqueueSnackbar(
      "Leave request has been successfully approved",
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

  const handleRejectLeaveClick = () => {
    enqueueSnackbar(
      "Leave request has been successfully rejected",
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

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Requester Information
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Job Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Email</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      {/* <Avatar src={order.customer.avatar} /> */}
                      <Typography className="truncate mx-8">
                        {`${order?.data?.requester?.name || "-"} `}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <span className="truncate">{`${
                      order?.data?.requester?.job?.name || "-"
                    }`}</span>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {`${order?.data?.requester?.email || "-"}`}
                    </Typography>
                  </td>

                  <td>
                    <Typography className="truncate">
                      {`${order?.data?.requester?.phoneNumber || "-"}`}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">radio_button_checked</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Leave Status
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Leave ID</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">From Date</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">To Date</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Description</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="truncate">{`${order?.data?.id}`}</span>
                </td>
                <td>
                  <span className="truncate">
                    {" "}
                    {moment(moment.utc(order?.data?.fromDate || "-").toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </td>
                <td>
                  <span className="truncate">
                    {" "}
                    {moment(moment.utc(order?.data?.toDate || "-").toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </td>
                <td>
                  <span className="truncate">
                    {`${order?.data?.description || "-"}`}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">category</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Category Leave Information
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Name</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Deduction Amount
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="truncate">{`${order?.data?.categoryName}`}</span>
                </td>

                <td>
                  <span className="truncate">{`${order?.data?.deductionAmount}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {order?.data?.status === "pending_approval" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        >
          <Grid
            container
            direction="row-reverse"
            justifyContent="flex-start"
            alignItems="flex-end"
            style={{
              paddingTop: "7rem",
            }}
          >
            <Grid item>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                style={{
                  padding: "1rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
                onClick={(ev) => {
                  dispatch(rejectLeave(order?.data?.id));
                  ev.stopPropagation();
                  handleRejectLeaveClick(ev);
                }}
              >
                Reject
              </Button>
            </Grid>
            <Grid item>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                style={{
                  padding: "1rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
                onClick={(ev) => {
                  dispatch(approveLeave(order?.data?.id));
                  ev.stopPropagation();
                  handleApproveLeaveClick(ev);
                }}
              >
                Approve
              </Button>
            </Grid>
          </Grid>
        </motion.div>
      )}
    </div>
  );
}

export default LeaveDetailsTab;
