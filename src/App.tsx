import React, { StrictMode } from "react";
import "./App.css";
import { MainRouter } from "@components//index";
import { loadIcons } from "@theme/index";
import { withInterceptorHandler } from "@hoc/index";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";

loadIcons();

const App: React.FunctionComponent = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      <StrictMode>
        <MainRouter />
      </StrictMode>
    </LocalizationProvider>
  );
};

export default withInterceptorHandler(App);
