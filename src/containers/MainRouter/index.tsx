import React from "react";
import { Paths } from "@utils/index";

import { Routes, Route } from "react-router-dom";

const DashboardAdmin = React.lazy(() => import("@modules/DashboardAdmin"));
const DashboardReception = React.lazy(
  () => import("@modules/DashboardReception")
);
const DashboardRoot = React.lazy(() => import("@modules/DashboardRoot"));

const MainRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path={Paths.moduleAdmin} element={<DashboardAdmin />} />
      <Route path={Paths.moduleReception} element={<DashboardReception />} />
      <Route path={Paths.moduleRoot} element={<DashboardRoot />} />
    </Routes>
  );
};

export default MainRouter;
