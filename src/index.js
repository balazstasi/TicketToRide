import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import "./styles/tailwind.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import WebSocketProvider from "./containers/socket-container";
import io from "socket.io-client";
import { WS_BASE } from "./containers/config";

export const socket = io(WS_BASE);

socket.on("connect", (ack) => {
  console.log("socket connected");
});

export const syncAction = (action, roomId, broadcast, ack) => {
  socket.emit("sync-action", roomId, action, broadcast, (ack) => {
    console.log(roomId);
    console.log("sync-action", ack.message, action);
  });
};

ReactDOM.render(
  <Provider store={store}>
    {/* <WebSocketProvider> */}
    <App />
    {/* </WebSocketProvider> */}
  </Provider>,
  document.getElementById("root")
);
