import React from "react";
import { Paths } from "@utils/index";

import { Routes, Route } from "react-router-dom";

const DashboardAdmin = React.lazy(
  () => import("@components/modules/admin/Admin")
);
const DashboardReception = React.lazy(
  () => import("@components/modules/reception/Reception")
);
const DashboardRoot = React.lazy(() => import("@components/modules/Root"));

export const MainRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path={Paths.moduleAdmin} element={<DashboardAdmin />} />
      <Route path={Paths.moduleReception} element={<DashboardReception />} />
      <Route path={Paths.moduleRoot} element={<DashboardRoot />} />
    </Routes>
  );
};