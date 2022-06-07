import { authRoles } from "app/auth";
import SuperAdminRoleExample from "./SuperAdminRoleExample";

const SuperAdminRoleExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.super_admin, // ['super_admin']
  routes: [
    {
      path: "/auth/super-admin-role-example",
      component: SuperAdminRoleExample,
    },
  ],
};

export default SuperAdminRoleExampleConfig;
