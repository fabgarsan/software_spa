import React from "react";
import "./App.css";
import { MainRouter } from "@containers/index";
import { loadIcons } from "@theme/index";
import { withInterceptorHandler } from "@hoc/index";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import * as moment from "moment";
import "moment/locale/es";

moment.locale("es");
loadIcons();

const App: React.FunctionComponent = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MainRouter />
    </MuiPickersUtilsProvider>
  );
};

export default withInterceptorHandler(App);
