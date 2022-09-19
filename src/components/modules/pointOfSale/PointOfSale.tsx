import React from "react";
import { Drawer } from "@components/shared";
import { PointOfSaleParkingPage } from "./parkingLot/PointOfSaleParkingPage";
import { ClosePointOfSalePage } from "./parkingLot/ClosePointOfSalePage";
import { DRAWER, Paths } from "@utils/index";
import { Route, Routes } from "react-router-dom";

const {
  modulePointOfSale: { parkingLot, close },
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
      </Routes>
    </Drawer>
  );
};

export default Reception;
