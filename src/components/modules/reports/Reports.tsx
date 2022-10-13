import React from "react";
import { Drawer, IconList } from "@components/shared";
import { ParkingHistoryReport } from "@components/modules/reports/services";
import { InvoicePage } from "@components/modules/reports/accounting";
import { SignInOutControlLogBookPage } from "@components/modules/reports/signControl/SignInOutControlLogBookPage";
import { DRAWER, Paths, PERMISSION_INSTANCES } from "@utils/index";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";

const {
  moduleReports: { parkingServicesHistory, signOutInLog, invoices },
} = Paths;

const Reports: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_REPORTS_PARKING_SERVICE_HISTORY,
      icon: "car",
      onClick: () => navigate(parkingServicesHistory),
      show: useCheckPermissions([
        PERMISSION_INSTANCES.PARKING_SERVICE
          .CAN_SEE_PARKING_SERVICE_HISTORY_REPORT,
      ]),
    },
    {
      text: DRAWER.MODULE_REPORTS_SIGN_IN_OUT_LOG,
      icon: "address-book",
      onClick: () => navigate(signOutInLog),
      show: useCheckPermissions([
        PERMISSION_INSTANCES.SIGN_IN_CONTROL
          .CAN_SEE_SIGN_OUT_SIGN_IN_HISTORY_REPORT,
      ]),
    },
    {
      text: DRAWER.MODULE_REPORTS_INVOICES,
      icon: "building-columns",
      onClick: () => navigate(invoices),
      show: true,
    },
  ];
  return (
    <Drawer
      title={DRAWER.MODULE_REPORTS_TITLE}
      items={itemsMenu}
      canShowContent={true}
    >
      <Routes>
        <Route
          path={parkingServicesHistory}
          element={<ParkingHistoryReport />}
        />
        <Route path={signOutInLog} element={<SignInOutControlLogBookPage />} />
        <Route path={invoices} element={<InvoicePage />} />
      </Routes>
    </Drawer>
  );
};

export default Reports;
