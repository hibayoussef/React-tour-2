import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }
    this.setSession(access_token);
    this.emit("onAutoLogin", true);
    // } else {
    //   this.setSession(null);
    //   this.emit("onAutoLogout", "access_token expired");
    // }
  };

  createUser = ({ firstName, lastName, email, phoneNumber, password }) => {
    console.log("create User...");
    return new Promise((resolve, reject) => {
      axios
        .post("auth/sign-up", {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        })
        .then((response) => {
          console.log("response axios: ", response);
          if (response.data.data) {
            this.setSession(response.data.data.access_token);

            this.setSession(response.data.data.accessToken);
            resolve(response.data.data);
            console.log(
              "inside jwtService ===> createUser Response Data: ",
              response.data
            );
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("auth/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.data) {
            const res = response.data.data;
            console.log("ressssss: ", res);
            // format user so we save dashboard user dto ##note
            const user = {
              uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
              from: "api",
              role: res.roles[0], // res.roles[0] || "staff ", /// ##note you must handle the roles in the whole system and replace them with yours,
              data: {
                displayName: `${res.firstName} ${res.lastName}`,
                photoURL: `${res.avatar?.url}`,
                email: res.email,
              },
            };

            this.setSession(response.data.data.accessToken);
            resolve(user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  resetPassword = (oldPassword, newPassword, email) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/change-password", {
          oldPassword,
          newPassword,
          email,
        })
        .then((response) => {
          console.log("reset password response: ", response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/access-token", {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            this.logout();
            // reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          // reject(new Error("Failed to login with token."));
        });
    });
  };

  getUserData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("users/me", {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.data) {
            const res = response.data.data;
            const user = {
              uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
              from: "api",
              role: res.roles[0],
              data: {
                displayName: `${res.firstName} ${res.lastName}`,
                photoURL: `${res.avatar?.url}`,
                email: res.email,
              },
            };
            if (response.data.data.accessToken) {
              this.setSession(response.data.data.accessToken);
              console.log("access token: ", response.data.data.accessToken);
            }
            resolve(user);
            resolve(response.data.user);
          } else {
            this.logout();
            // reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          // reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("accessToken", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("accessToken");
  };
}

const instance = new JwtService();

export default instance;
