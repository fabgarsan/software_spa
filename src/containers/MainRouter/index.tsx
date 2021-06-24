import React, { Suspense } from "react";
import { Paths } from "@utils/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BackdropLoading } from "@components/index";

const DashboardAdmin = React.lazy(() => import("@modules/DashboardAdmin"));
const DashboardReception = React.lazy(
  () => import("@modules/DashboardReception")
);
const DashboardRoot = React.lazy(() => import("@modules/DashboardRoot"));

const MainRouter: React.FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<BackdropLoading isOpen />}>
        <Switch>
          <Route path={Paths.moduleAdmin} component={DashboardAdmin} />
          <Route path={Paths.moduleReception} component={DashboardReception} />
          <Route path={Paths.moduleRoot} component={DashboardRoot} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default MainRouter;
