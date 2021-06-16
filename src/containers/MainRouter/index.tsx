import React from "react";
import { Paths } from "@utils/index";
import {
  DashboardAdmin,
  DashboardRoot,
  DashboardReception,
} from "@modules/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainRouter: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={Paths.moduleAdmin} component={DashboardAdmin} />
        <Route path={Paths.moduleReception} component={DashboardReception} />
        <Route path={Paths.moduleRoot} component={DashboardRoot} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
