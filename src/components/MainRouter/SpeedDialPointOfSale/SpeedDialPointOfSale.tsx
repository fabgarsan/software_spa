import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Badge } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { usePointOfSaleAccessQuery } from "@api/pointOfSale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Paths } from "@utils/index";
import { getPointOfSaleOpen } from "@api/pointOfSale";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const {
  modulePointOfSale: {
    main,
    close,
    parkingLot,
    escortServices,
    moneyOperations,
  },
} = Paths;

export const SpeedDialPointOfSale = () => {
  const navigate = useNavigate();
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  if (!isSuccess || !pointOfSaleAccessData.openWorkShift) {
    return <></>;
  }

  const openPointOfSale =
    isSuccess && getPointOfSaleOpen(pointOfSaleAccessData);

  const hasParkingLotServicesSales =
    openPointOfSale?.hasParkingLotServicesSales || false;

  const hasEscortServicesSales =
    openPointOfSale?.hasEscortServicesSales || false;

  const hasMoneyOperations =
    openPointOfSale?.hasIncomeOperations ||
    openPointOfSale?.hasOutcomesOperations ||
    false;

  const actions = [
    {
      icon: (
        <Badge badgeContent="x" color="primary">
          <FontAwesomeIcon icon={["fal", "cash-register"]} size="2x" />
        </Badge>
      ),
      name: "Cerrar Punto de Venta",
      onClick: () => navigate(`${main}${close}`),
    },
    {
      hidden: !hasParkingLotServicesSales,
      icon: <FontAwesomeIcon icon={["fal", "car"]} size="2x" />,
      name: "Parqueadero",
      onClick: () => navigate(`${main}${parkingLot}`),
    },
    {
      hidden: !hasEscortServicesSales,
      icon: <FontAwesomeIcon icon={["fal", "bed"]} size="2x" />,
      name: "Servicios",
      onClick: () => navigate(`${main}${escortServices}`),
    },
    {
      hidden: !hasMoneyOperations,
      icon: <FontAwesomeIcon icon={["fal", "hand-holding-dollar"]} size="2x" />,
      name: "Ingresos - Egresos",
      onClick: () => navigate(`${main}${moneyOperations}`),
    },
  ];
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <Box sx={{ position: "relative", mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={!isSuccess || !pointOfSaleAccessData.openWorkShift}
          icon={<FontAwesomeIcon icon={["fal", "ellipsis-stroke"]} size="2x" />}
          direction="left"
        >
          {actions
            .filter(({ hidden }) => !hidden)
            .map(({ icon, name, onClick }) => (
              <SpeedDialAction
                key={name}
                icon={icon}
                tooltipTitle={name}
                onClick={onClick}
              />
            ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
};
