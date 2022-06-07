import { lazy } from "react";
import { Redirect } from "react-router-dom";

const InvoicesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/invoices-section/invoices/new-invoice",
      component: lazy(() => import("./invoice/addInvoice/Invoice")),
    },
    {
      path: "/apps/invoices-section/invoices/:invoiceId",
      component: lazy(() => import("./invoice/invoiceDetails/details")),
    },

    {
      path: "/apps/invoices-section/invoices",
      component: lazy(() => import("./invoices/Invoices")),
    },

    {
      path: "/apps/invoices-section/archive",
      component: lazy(() => import("./archive-invoices/ArchiveInvoices")),
    },

    {
      path: "/apps/invoices-section",
      component: () => <Redirect to="/apps/invoices-section/invoices" />,
    },
  ],
};

export default InvoicesAppConfig;
