import React from "react";
import { Paths } from "@utils/index";
import { Root } from "@containers/index";
import { AdminDashboard } from "@modules/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainRouter: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={Paths.adminModule} component={AdminDashboard} />
        <Route path={Paths.root} component={Root} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
