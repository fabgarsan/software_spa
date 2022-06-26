import React from "react";
import { SignInControl } from "@dto/authentication";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { INSTANCES_NAMES, diffDates } from "@utils/index";
import moment from "moment";

interface SignInOutControlListProps {
  list: SignInControl[];
}

const SignInOutControlLogBookList = ({ list }: SignInOutControlListProps) => {
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
            const timeIn = moment(signInDatetime).format("LL, LT");
            const timeOut = signOutDatetime
              ? moment(signOutDatetime).format("LL, LT")
              : null;

            const hours = signOutDatetime
              ? diffDates(signOutDatetime, signInDatetime, "hours")
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
        renderList(escorts, INSTANCES_NAMES.ESCORT_PLURAL)}
      {Boolean(employees.length) &&
        renderList(employees, INSTANCES_NAMES.EMPLOYEE_PLURAL)}
    </Grid>
  );
};
export default SignInOutControlLogBookList;
