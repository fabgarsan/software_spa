import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { GetParkingServiceResponse } from "@api/parking";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
}));

interface ParkingServiceItemProps {
  item: GetParkingServiceResponse;
  onClick: () => void;
}

export const ParkingServiceItem = ({
  item: { licensePlate, vehicleTypeName },
  onClick,
}: ParkingServiceItemProps) => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} xl={1} textAlign="center">
      <Item elevation={3} onClick={onClick}>
        <Typography variant="subtitle1">{licensePlate}</Typography>
        <Typography variant="caption">{vehicleTypeName}</Typography>
      </Item>
    </Grid>
  );
};
