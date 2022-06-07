import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Message() {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto items-center justify-center p-16 sm:p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-400">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <div className="m-32">
                  {/* <Icon className="text-96" color="action"> */}
                  <img
                    //   className="w-64"
                    width="90rem"
                    //   height="0%"
                    src="assets/images/logos/admin.png"
                    alt="admin"
                  />
                  {/* </Icon> */}
                </div>
              </motion.div>
              <Typography
                variant="h5"
                className="text-center mb-16 font-semibold"
              >
                Thank you for your registration.
              </Typography>

              <Typography
                className="text-center mb-16 w-full"
                color="textSecondary"
              >
                A registration request has been sent to <b> admin</b>.
              </Typography>

              <Typography className="text-center w-full" color="textSecondary">
                After the registration request is approved, go to{" "}
                <Link className="font-normal" to="/login">
                  login
                </Link>{" "}
                page.
                <div className="flex flex-col items-center justify-center pt-32 pb-15">
                  Or
                </div>
              </Typography>

              <div className="flex flex-col items-center justify-center pt-28 pb-24">
                <Link className="font-normal" to="/register">
                  Go back to Signup
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Message;
