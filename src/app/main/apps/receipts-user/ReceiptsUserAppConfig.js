import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ReceiptsUserAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/e-commerce-user/orders-user/:orderId",
      component: lazy(() => import("./receipt/Receipt")),
    },
    {
      path: "/apps/e-commerce-user/products-user",
      component: lazy(() => import("./receipts/Receipts")),
    },
    {
      path: "/apps/e-commerce-user",
      component: () => <Redirect to="/apps/e-commerce-user/products-user" />,
    },
  ],
};

export default ReceiptsUserAppConfig;
