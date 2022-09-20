import React from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";
import { Box, Typography } from "@mui/material";

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
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Parqueadero
      </Typography>
    </Box>
  );
};
