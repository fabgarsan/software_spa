import React from "react";
import { Paths } from "@utils/index";
import { Root, AdminDashboard } from "@containers/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Paths.root} component={Root} />
        <Route exact path={Paths.adminModule} component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
