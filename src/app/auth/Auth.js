import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import jwtService from "app/services/jwtService";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hideMessage, showMessage } from "app/store/fuse/messageSlice";

import { setUserDataAuth0, setUserData, logoutUser } from "./store/userSlice";

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      // this.auth0Check(),
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on("onAutoLogin", () => {
        this.props.showMessage({ message: "Logging in with JWT" });
        console.log("Reaching ...");
        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          // .signInWithToken()
          .getUserData()
          .then((user) => {
            console.log("jwtService.getUserDate.then()::");
            this.props.setUserData(user);

            resolve();

            // this.props.showMessage({ message: "Logged in with JWT" });
          })
          .catch((error) => {
            this.props.showMessage({ message: error.message });

            resolve();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
          this.props.showMessage({ message });
        }

        this.props.logout();

        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? (
      <FuseSplashScreen />
    ) : (
      <>{this.props.children}</>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserData,
      setUserDataAuth0,
      showMessage,
      hideMessage,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
