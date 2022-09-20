import React from "react";
import { Drawer } from "@components/shared";
import { PointOfSaleParkingPage } from "./PointOfSaleParkingPage";
import { ClosePointOfSalePage } from "./ClosePointOfSalePage";
import { MoneyOperationPointOfSalePage } from "./MoneyOperationPointOfSalePage";
import { PointOfSaleEscortServices } from "./PointOfSaleEscortServices";
import { DRAWER, Paths } from "@utils/index";
import { Route, Routes } from "react-router-dom";

const {
  modulePointOfSale: { parkingLot, close, escortServices, moneyOperations },
} = Paths;

const Reception: React.FunctionComponent = () => {
  return (
    <Drawer
      title={DRAWER.MODULE_POINT_OF_SALE_TITLE}
      items={[]}
      canShowContent={true}
    >
      <Routes>
        <Route path={parkingLot} element={<PointOfSaleParkingPage />} />
        <Route path={close} element={<ClosePointOfSalePage />} />
        <Route path={escortServices} element={<PointOfSaleEscortServices />} />
        <Route
          path={moneyOperations}
          element={<MoneyOperationPointOfSalePage />}
        />
      </Routes>
    </Drawer>
  );
};

export default Reception;
