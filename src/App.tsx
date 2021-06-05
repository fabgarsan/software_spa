import React from "react";
import "./App.css";
import { MainRouter } from "@containers/index";
import loadIcons from "@theme/loadIcons";
import { withInterceptorHandler } from "@hoc/index";

loadIcons();

const App: React.FunctionComponent = () => {
  return <MainRouter />;
};

export default withInterceptorHandler(App);
