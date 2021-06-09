import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import "./styles/tailwind.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import WebSocketProvider from "./containers/socket-container";
import io from "socket.io-client";
import { connect } from "@giantmachines/redux-websocket";
import { WS_BASE } from "./containers/config";

// export const socket = io.connect(WS_BASE);
const socket = store.dispatch(connect("http://webprogramozas.inf.elte.hu:3031/"));

socket.on("connect", () => {
  console.log("socket connected");
});

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>,
  document.getElementById("root")
);
