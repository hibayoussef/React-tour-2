import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ReceiptsHrManagerAppConfig = {
  settings: {
    layout: {},
  },
  /**
   * if you have /users/pictures and /users/pictures/profile
   * if router hits /users/pictures/* and ' /users/pictures' comes before it will always render it
   *
   * any sub paths must be presented before root path, I mean '/users/pictures/profile'
   *
   * so the right order would be:
   * [
   *
   *  '/users/pictures/profile',
   *  '/users/pictures'
   * ]
   *
   */
  routes: [
    {
      path: "/apps/e-commerce/orders-hr-manager-and-manager/:orderId",
      component: lazy(() => import("./receipt/Receipt")),
    },
    {
      path: "/apps/receipts/my-receipts/hr-manager-and-manager",
      component: lazy(() => import("./receipts/Receipts")),
    },

    {
      path: "/apps/receipts/receipts/hr-manager-and-manager",
      component: lazy(() => import("./receipts/Receipts")),
    },
    {
      path: "/apps/receipts/hr-manager-and-manager",
      component: () => (
        <Redirect to="/apps/receipts/receipts/hr-manager-and-manager" />
      ),
    },
  ],
};

export default ReceiptsHrManagerAppConfig;
