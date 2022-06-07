import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import _ from "@lodash";
import {
  saveProduct,
  removeProduct,
  addSalaryScale,
} from "../store/salaryScaleSlice";

function SalaryScaleDetailHeader(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();

  function handleSaveProduct() {
    dispatch(addSalaryScale(getValues()));
  }

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/salary-scales-section/salary-scales"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              Salary Scales
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              {/* <Typography className="text-16 sm:text-20 truncate font-semibold">
                {name || "New Salary Scale"}
              </Typography> */}
              <Typography variant="caption" className="font-medium">
                Salary Scale Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryScaleDetailHeader;
