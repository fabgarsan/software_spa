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

import { SpeedDialPointOfSale } from "../MainRouter/SpeedDialPointOfSale";

const DashboardPointOfSale = React.lazy(
  () => import("@components/modules/pointOfSale/PointOfSale")
);

const { moduleAdmin, moduleReception, modulePointOfSale, root } = Paths;

export const MainRouter: React.FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path={`${moduleAdmin.main}*`} element={<DashboardAdmin />} />
        <Route
          path={`${moduleReception.main}*`}
          element={<DashboardReception />}
        />
        <Route path={`${root}*`} element={<DashboardRoot />} />
        <Route
          path={`${modulePointOfSale.main}*`}
          element={<DashboardPointOfSale />}
        />
      </Routes>
      <SpeedDialPointOfSale />
    </>
  );
};
