import React from "react";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { format } from "date-fns";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import { GetParkingServiceResponse } from "@api/parking";
import {
  displayHoursAndMinutesFromMinutes,
  formatIntoMoney,
} from "@utils/functions";

interface ServicesHistoryListProps {
  list: GetParkingServiceResponse[];
}

const instanceDescriptorParkingServices =
  instancesDescriptor[InstancesDescriptorKeys.parkingService];

const timeFormat = "LLLL dd, KK:mm:ss aaa";

export const HistoryTable = ({ list }: ServicesHistoryListProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          {instanceDescriptorParkingServices.plural} ({list.length})
        </Typography>
        <List dense>
          {list.map((service) => {
            const {
              vehicleTypeName,
              licensePlate,
              finalTime,
              initialTime,
              payment,
              lengthOfServiceMinutes,
            } = service;
            const timeIn = format(new Date(initialTime), timeFormat);
            const timeOut = finalTime
              ? format(new Date(finalTime), timeFormat)
              : null;
            const presentTime = `[${timeIn}${timeOut ? ` - ${timeOut}` : ""}] ${
              (lengthOfServiceMinutes &&
                displayHoursAndMinutesFromMinutes(lengthOfServiceMinutes)) ||
              "Presente"
            }`;
            return (
              <ListItem key={service.id}>
                <ListItemText
                  primary={`${licensePlate} - ${vehicleTypeName} (${formatIntoMoney(
                    payment
                  )})`}
                  secondary={presentTime}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
