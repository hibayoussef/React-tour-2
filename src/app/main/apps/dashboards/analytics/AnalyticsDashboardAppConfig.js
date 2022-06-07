import { authRoles } from "app/auth";
import { lazy } from "react";

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: authRoles.user,
      path: "/apps/dashboards/analytics",
      component: lazy(() => import("./AnalyticsDashboardApp")),
    },
  ],
};

export default AnalyticsDashboardAppConfig;
