import { lazy } from "react";

const ResetPasswordPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/pages/auth/reset-password",
      component: lazy(() => import("./ResetPasswordPage")),
    },
  ],
};

export default ResetPasswordPageConfig;
