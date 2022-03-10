import React, { Suspense } from "react";
import { Paths } from "@utils/index";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path={Paths.moduleAdmin} element={DashboardAdmin} />
          <Route path={Paths.moduleReception} element={DashboardReception} />
          <Route path={Paths.moduleRoot} element={DashboardRoot} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default MainRouter;
