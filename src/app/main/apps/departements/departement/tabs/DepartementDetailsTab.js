import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <Icon className="text-red">place</Icon>
    </Tooltip>
  );
}

function DepartementDetailsTab() {
  const order = useSelector(
    ({ departementsApp }) => departementsApp.departement
  );
  const [map, setMap] = useState("shipping");

  console.log("order: ", order);
  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">details</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Departement Information
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
                    <Typography className="font-semibold">title</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      Number Employees
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">createdAt</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <Typography className="truncate mx-8">
                        {`${order?.id || "-"}`}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {`${order?.title || "-"}`}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order?.maxNumberOfEmployees || "-"}
                    </Typography>
                  </td>
                  <td>
                    <span className="truncate">{order?.createdAt || "-"}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Users
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
                  <Typography className="font-semibold">Email</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Phone Number
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Job</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.users?.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.name || "-"}</td>
                  <td>{user?.email || "-"}</td>
                  <td>{user?.phoneNumber || "-"}</td>
                  <td>{user?.job?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepartementDetailsTab;
