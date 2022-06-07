import { authRoles } from "app/auth";
import Message from "./Message";

const MessageConfig = {
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
  auth: authRoles.user,
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/message",
      component: Message,
    },
  ],
};

export default MessageConfig;
