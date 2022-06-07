import { lazy } from "react";
import { Redirect } from "react-router-dom";

const WorksAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
   
    {
      path: "/apps/jobs-hr-and-manager/all/:id",
      component: lazy(() => import("./workDetails/WorkDetails")),
    },
    {
      path: "/apps/jobs-hr-and-manager/all",
      component: lazy(() => import("./works/Works")),
    },
    {
      path: "/apps/jobs-hr-and-manager",
      component: () => <Redirect to="/apps/jobs-hr-and-manager/all" />,
    },
  ],
};

export default WorksAppConfig;
