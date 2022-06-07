import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { removeDeduction, removeSalary } from "../../store/receiptSlice";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllReceipts } from "../../store/receiptsSlice";
import { getReceipt } from "../../store/receiptSlice";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

function ReceiptDetailsTab() {
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.receipt);
  const dispatch = useDispatch();
  const [map, setMap] = useState("shipping");
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const params = {
    receiptId: "",
    id: "",
  };

  const deductionRemoveHandleClick = () => {
    enqueueSnackbar(
      "deduction was deleted successfully.!",
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

  const salaryRemoveHandleClick = () => {
    enqueueSnackbar(
      "salary was deleted successfully.!",
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
  function handleRemoveDeduction(orderID, deductionID) {
    const params = { receiptId: orderID, id: deductionID };
    dispatch(removeDeduction(params)).then(() => {
      history.push("/apps/receipts/receipts");
      dispatch(getReceipt());
      dispatch(getAllReceipts());
    });
  }

  function handleRemoveSalary(orderID, salaryId) {
    const params = { receiptId: orderID, id: salaryId };
    dispatch(removeSalary(params)).then(() => {
      history.push("/apps/receipts/receipts");
      dispatch(getReceipt());
      dispatch(getAllReceipts());
    });
  }

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
                      <Avatar src={order.user?.avatar?.url} />
                      {/* <Avatar src="assets/images/avatars/Lily.jpg" /> */}

                      <Typography className="truncate mx-8">
                        {order.user.name}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.user.email}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.user.phoneNumber || '-'}
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
                <td>
                  <IconButton
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleRemoveSalary(order.id, order.salary.id);
                      salaryRemoveHandleClick(ev);
                    }}
                    style={{
                      color: "red",
                      border: "none",
                      marginLeft: "5rem",
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
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
                  <td>
                    <IconButton
                      onClick={(ev) => {
                        ev.stopPropagation();
                        handleRemoveDeduction(order.id, deduction.id);
                        deductionRemoveHandleClick(ev);
                      }}
                      style={{ color: "red", border: "none" }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
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
