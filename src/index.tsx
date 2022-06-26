import App from "./App";
import React from "react";
import store from "@stores/store";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
