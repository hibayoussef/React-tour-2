import Button from "@material-ui/core/Button";
import auth0Service from "app/services/auth0Service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDataAuth0 } from "app/auth/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";

function Auth0LoginTab(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    showDialog();
  }, [dispatch]);

  function showDialog() {}

  return (
    <div className="w-full">
      <Button
        className="w-full my-48"
        color="primary"
        variant="contained"
        onClick={showDialog}
      >
        Log In/Sign Up with Auth0
      </Button>
    </div>
  );
}

export default Auth0LoginTab;
