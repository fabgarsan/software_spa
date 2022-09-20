import React from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";
import { Box, Typography } from "@mui/material";

export const MoneyOperationPointOfSalePage: React.FunctionComponent = () => {
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  if (!isSuccess || !pointOfSaleAccessData.openWorkShift) {
    return <></>;
  }
  const openPointOfSale = getPointOfSaleOpen(pointOfSaleAccessData);
  const hasMoneyOperations =
    openPointOfSale?.hasIncomeOperations ||
    openPointOfSale?.hasOutcomesOperations ||
    false;
  if (!hasMoneyOperations) return <></>;
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Ingresos - Egresos
      </Typography>
    </Box>
  );
};
