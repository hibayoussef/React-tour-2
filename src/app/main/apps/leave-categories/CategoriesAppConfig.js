import { lazy } from "react";
import { Redirect } from "react-router-dom";

const CategoriesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/categories/new-category",
      component: lazy(() => import("./add-category/AddDialog")),
    },
   
    {
      path: "/apps/leaves-categories-section/categories",
      component: lazy(() => import("./categories/Categories")),
    },
    {
      path: "/apps/leaves-categories-section",
      component: () => <Redirect to="/apps/leaves-categories-section/categories" />,
    },
  ],
};

export default CategoriesAppConfig;
