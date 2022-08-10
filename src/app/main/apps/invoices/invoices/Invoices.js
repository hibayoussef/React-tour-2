import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import InvoicesHeader from "./InvoicesHeader";
import InvoicesTable from "./InvoicesTable";
import io from "socket.io-client";
import { getInvoices, selectInvoices } from "../store/invoicesSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const socket = io("http://192.168.92.5:3000/flutter", {
  // path: "/invoice-socket/",
  extraHeaders: {
    Authorization: localStorage.getItem("accessToken"),
  },
});

function Invoices() {
  // -----------------------------------
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("a user connected: ", isConnected);
    });

    socket.on("invoice_analyzed", (data) => {
      // TODO
      console.log("datatatt: ", data);
      // axios.get()
      dispatch(getInvoices());
      console.log("invoices: ");
      // ---------------
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("a user disConnected: ", isConnected);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("error", (error) => {
      console.log(error);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  console.log("isConnected: ", isConnected);
  // ----------------------------

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<InvoicesHeader />}
      content={<InvoicesTable />}
      innerScroll
    />
  );
}

export default withReducer("invoicesApp", reducer)(Invoices);
