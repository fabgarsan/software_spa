import React, { StrictMode } from "react";
import "./App.css";
import { MainRouter } from "@containers/index";
import { loadIcons } from "@theme/index";
import { withInterceptorHandler } from "@hoc/index";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import esLocale from "date-fns/locale/es";

loadIcons();

const App: React.FunctionComponent = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
      <StrictMode>
        <MainRouter />
      </StrictMode>
    </LocalizationProvider>
  );
};

export default withInterceptorHandler(App);
