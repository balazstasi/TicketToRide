import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import "./styles/tailwind.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import WebSocketProvider from "./containers/socket-container";

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>,
  document.getElementById("root")
);
