import { authRoles } from "app/auth";
import ManagerRoleExample from "./ManagerRoleExample";

const ManagerRoleExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.manager, // ['manager']
  routes: [
    {
      path: "/auth/manager-role-example",
      component: ManagerRoleExample,
    },
  ],
};

export default ManagerRoleExampleConfig;
