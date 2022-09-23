import React from "react";
import { SignInControl } from "@dto/authentication";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { format } from "date-fns";
import { differenceInHours } from "date-fns";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

interface LogBookListProps {
  list: SignInControl[];
}

const instanceDescriptorEscort =
  instancesDescriptor[InstancesDescriptorKeys.escort];

const instanceDescriptorEmployee =
  instancesDescriptor[InstancesDescriptorKeys.employee];

const timeFormat = "LLLL dd, KK:mm:ss aaa";

export const LogBookList = ({ list }: LogBookListProps) => {
  const sortedList = list.sort((a, b) => a.fullName.localeCompare(b.fullName));
  const escorts = sortedList.filter((user) => user.userType === "A");
  const employees = sortedList.filter((user) => user.userType === "T");

  const renderList = (usersList: SignInControl[], title: string) => {
    return (
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom color="primary">
          {title}
        </Typography>
        <List dense>
          {usersList.map((user) => {
            const { categoryName, signOutDatetime, signInDatetime, fullName } =
              user;
            const timeIn = format(new Date(signInDatetime), timeFormat);
            const timeOut = signOutDatetime
              ? format(new Date(signOutDatetime), timeFormat)
              : null;

            const hours = signOutDatetime
              ? `- ${differenceInHours(
                  new Date(signOutDatetime),
                  new Date(signInDatetime)
                )} horas`
              : "Presente";

            const presentTime = `[${timeIn}${
              timeOut ? ` - ${timeOut}` : ""
            }] ${hours}`;
            return (
              <ListItem key={user.id}>
                <ListItemText
                  primary={`${fullName} ${
                    categoryName ? `- ${categoryName}` : ""
                  }`}
                  secondary={presentTime}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
  };

  return (
    <Grid container>
      {Boolean(escorts.length) &&
        renderList(escorts, instanceDescriptorEscort.plural)}
      {Boolean(employees.length) &&
        renderList(employees, instanceDescriptorEmployee.plural)}
    </Grid>
  );
};
