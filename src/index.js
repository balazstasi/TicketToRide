import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Store from "./store/store";
import { Provider } from "react-redux";
import store from "./store/index";

import "./styles/tailwind.css";

ReactDOM.render(
  <Provider store={store}>
    <Store>
      <App />
    </Store>
  </Provider>,
  document.getElementById("root")
);
