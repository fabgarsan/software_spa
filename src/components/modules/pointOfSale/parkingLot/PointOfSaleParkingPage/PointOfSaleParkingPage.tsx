import React from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";

export const PointOfSaleParkingPage: React.FunctionComponent = () => {
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  if (!isSuccess || !pointOfSaleAccessData.openWorkShift) {
    return <></>;
  }
  const openPointOfSale = getPointOfSaleOpen(pointOfSaleAccessData);
  const hasParkingLotServicesSales =
    openPointOfSale?.hasParkingLotServicesSales || false;
  if (!hasParkingLotServicesSales) return <></>;
  return <div>EL PARQUEADERO</div>;
};
