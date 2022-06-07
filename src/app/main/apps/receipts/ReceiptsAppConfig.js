import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ReceiptsAppConfig = {
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
      path: "/apps/e-commerce/products/new",
      component: lazy(() => import("./add-receipt/AddReceipt")),
    },
    {
      path: "/apps/e-commerce/orders/:orderId",
      component: lazy(() => import("./receipt/Receipt")),
    },

    {
      path: "/apps/receipts/receipts",
      component: lazy(() => import("./receipts/Receipts")),
    },
  
    {
      path: "/apps/receipts",
      component: () => <Redirect to="/apps/receipts/receipts" />,
    },
  ],
};

export default ReceiptsAppConfig;
