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
import moment from "moment";
import { motion } from "framer-motion";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";

function WorkDetailsTab() {
  const dispatch = useDispatch();
  const order = useSelector(({ worksApp }) => worksApp.work);
  console.log("order details: ", order);

  const [map, setMap] = useState("shipping");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  
  // const handleRejectLeaveClick = () => {
  //   enqueueSnackbar(
  //     "Leave request has been successfully rejected",
  //     { variant: "error" },
  //     {
  //       anchorOrigin: {
  //         vertical: "top",
  //         horizontal: "right",
  //       },
  //     },
  //     { TransitionComponent: Slide }
  //   );
  // };

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Job Information
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">ID</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Description</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>
                    <Typography className="truncate">
                      {`${order?.id}`}
                    </Typography>
                  </td>

                  <td>
                    <div className="flex items-center">
                      {/* <Avatar src={order.customer.avatar} /> */}
                      <Typography className="truncate mx-8">
                    
                       {`${order?.name}`}
                      </Typography>
                    </div>
                  </td>
                  
                  <td>
                    <span className="truncate">
                     {`${ order?.description}`}
                    </span>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">access_time</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
          Information of the department that is located in the job
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Department ID</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Title</Typography>
                </th>
                <th>
                  <Typography className="font-semibold"> Number Of Employees</Typography>
                </th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="truncate">{`${order?.department?.id || '-'}`}</span>
                </td>
                {/* <td>
                  <span className="truncate">
                    {" "}
                    {order?.department?.title || "-"}
                  </span>
                </td>
               
                <td>
                  <span className="truncate">
                    {`${order?.data?.maxNumberOfEmployees || "-"}`}
                  </span>
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">access_time</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
          Information of users who do this job
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">User ID</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Name</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Email</Typography>
                </th>

                <th>
                  <Typography className="font-semibold">Phone Number</Typography>
                </th>
               
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>
                  <span className="truncate">{`${order?.department?.users?.associatedRoles?.userId || '-'}`}</span>
                </td>
                <td>
                  <span className="truncate">
                    {" "}
                    {order?.department?.users?.name || "-"}
                  </span>
                </td>
               
                <td>
                  <span className="truncate">
                  {order?.department?.users?.email || "-"}
                  </span>
                </td>

                <td>
                  <span className="truncate">
                  {order?.department?.users?.phoneNumber || "-"}
                  </span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

        </div>
  );
}

export default WorkDetailsTab;
