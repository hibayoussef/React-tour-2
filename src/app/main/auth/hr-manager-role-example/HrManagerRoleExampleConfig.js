import { authRoles } from "app/auth";
import HrManagerRoleExample from "./HrManagerRoleExample";

const HrManagerRoleExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.hr_manager, // ['hr_manager']
  routes: [
    {
      path: "/auth/hr-manager-role-example",
      component: HrManagerRoleExample,
    },
  ],
};

export default HrManagerRoleExampleConfig;
