import React from "react";
import { Drawer } from "@components/shared";
import { DRAWER } from "@utils/index";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";

export const PointOfSaleParking: React.FunctionComponent = () => {
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  if (!isSuccess || !pointOfSaleAccessData.openWorkShift) {
    return <></>;
  }
  const openPointOfSale = getPointOfSaleOpen(pointOfSaleAccessData);
  const hasParkingLotServicesSales =
    openPointOfSale?.hasParkingLotServicesSales || false;
  return (
    <Drawer
      title={DRAWER.MODULE_PARKING_LOT_TITLE}
      items={[]}
      canShowContent={hasParkingLotServicesSales}
    >
      EL PARQUEADERO
    </Drawer>
  );
};
