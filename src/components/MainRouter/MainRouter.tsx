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
const DashboardReports = React.lazy(
  () => import("@components/modules/reports/Reports")
);

const DashboardLabs = React.lazy(() => import("@components/modules/labs/Labs"));

const {
  moduleAdmin,
  moduleReception,
  modulePointOfSale,
  moduleReports,
  root,
  moduleLabs,
} = Paths;

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
        <Route path={`${moduleReports.main}*`} element={<DashboardReports />} />
        <Route path={`${moduleLabs.main}*`} element={<DashboardLabs />} />
      </Routes>
      <SpeedDialPointOfSale />
    </>
  );
};
