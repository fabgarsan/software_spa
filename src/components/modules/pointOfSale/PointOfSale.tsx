import React from "react";
import { Drawer } from "@components/shared";
import { PointOfSaleParkingPage } from "@components/modules/pointOfSale//PointOfSaleParkingPage";
import { ClosePointOfSalePage } from "@components/modules/pointOfSale//ClosePointOfSalePage";
import { MoneyOperationPointOfSalePage } from "@components/modules/pointOfSale//MoneyOperationPointOfSalePage";
import { PointOfSaleEscortServices } from "@components/modules/pointOfSale//PointOfSaleEscortServices";
import { DRAWER, Paths } from "@utils/index";
import { Route, Routes } from "react-router-dom";

const {
  modulePointOfSale: { parkingLot, close, escortServices, moneyOperations },
} = Paths;

const PointOfSale: React.FunctionComponent = () => {
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

export default PointOfSale;
