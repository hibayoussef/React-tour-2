import { lazy } from "react";
import { Redirect } from "react-router-dom";

const DepartementsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/departements-section/departements/new-departement",
      component: lazy(() => import("./addDepartement/AddDepartement")),
    },
    {
      path: "/apps/departements-section/departements/:departementId",
      component: lazy(() => import("./departement/Departement")),
    },
    {
      path: "/apps/departements-section/departements",
      component: lazy(() => import("./departements/Departements")),
    },
    {
      path: "/apps/departements-section",
      component: () => (
        <Redirect to="/apps/departements-section/departements" />
      ),
    },
  ],
};

export default DepartementsAppConfig;
