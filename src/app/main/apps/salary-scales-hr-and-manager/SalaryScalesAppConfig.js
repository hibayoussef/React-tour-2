import { lazy } from "react";
import { Redirect } from "react-router-dom";

const SalaryScalesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
  
    {
      path: "/apps/salary-scales-section/salary-scales-hr-manager/:salaryScaleId",
      component: lazy(() => import("./salaryScaleDetails/SalaryScaleDetail")),
    },
    {
      path: "/apps/salary-scales-section/salary-scales-hr-manager",
      component: lazy(() => import("./salaryScales/SalaryScales")),
    },

    {
      path: "/apps/salary-scale-section-hr-manager",
      component: () => (
        <Redirect to="/apps/salary-scales-section/salary-scales-hr-manager" />
      ),
    },
  ],
};

export default SalaryScalesAppConfig;
