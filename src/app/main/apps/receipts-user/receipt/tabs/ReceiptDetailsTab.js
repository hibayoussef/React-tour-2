import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

function ReceiptDetailsTab() {
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.receipt);
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            User
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
                      {/* <Avatar src={order.user.avatar} /> */}
                      <Avatar src="assets/images/avatars/Lily.jpg" />

                      <Typography className="truncate mx-8">
                        {/* {`${order.customer.firstName} ${order.customer.lastName}`} */}
                        Samara Kamal
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {/* {order.customer.email} */}
                      samara@gmail.com
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {/* {order.customer.phone} */}
                      0947483381
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
          <Icon color="action">attach_money</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Salary
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>

                <th>
                  <Typography className="font-semibold">
                    Work Start Date
                  </Typography>
                </th>

                <th>
                  <Typography className="font-semibold">
                    Work End Date
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Bonus</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>£</span>
                  <span className="truncate">{order.salary.amount}</span>
                </td>
                <td>
                  <span className="truncate">{order.salary.workStartDate}</span>
                </td>
                <td>
                  <span className="truncate">{order.salary.workEndDate}</span>
                </td>
                <td>
                  <span>£</span>
                  <span className="truncate">{order.salary.bonus}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">moneyOff</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Deductions
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Type</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Reason</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order.deductions.map((deduction) => (
                <tr key={deduction.id}>
                  <td>
                    <span>£</span>
                    <span className="truncate">{deduction.amount}</span>
                  </td>
                  <td>
                    <span className="truncate">{deduction.type}</span>
                  </td>
                  <td>
                    <span className="truncate">{deduction.reason}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReceiptDetailsTab;
