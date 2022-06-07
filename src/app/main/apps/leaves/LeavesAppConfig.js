import { lazy } from "react";
import { Redirect } from "react-router-dom";

const LeavesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/leaves-section/leaves/new-leave",
      component: lazy(() => import("./add-leave/AddLeave")),
    },
    {
      path: "/apps/leaves-section/leaves/:leaveId",
      component: lazy(() => import("./leave/Leave")),
    },
    {
      path: "/apps/leaves-section/leaves",
      component: lazy(() => import("./leaves/Leaves")),
    },
    // {
    //   path: "/apps/leaves-section/my-leaves",
    //   component: lazy(() => import("./my-leaves/MyLeaves")),
    // },
    {
      path: "/apps/leaves-section/approval-leaves",
      component: lazy(() => import("./archive-leaves/ArchiveLeaves")),
    },
    {
      path: "/apps/leaves-section/my-leaves",
      component: lazy(() => import("./myLeavesnew/ArchiveLeaves")),
    },
    
    {
      path: "/apps/leaves-section",
      component: () => <Redirect to="/apps/leaves-section/leaves" />,
    },
  ],
};

export default LeavesAppConfig;
