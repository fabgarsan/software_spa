import React from "react";
import { ExtendedUser } from "@dto/users";
import { Grid, Typography, Box } from "@mui/material";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import { isEscort } from "@utils/typeGuards";

const instanceDescriptorEscort =
  instancesDescriptor[InstancesDescriptorKeys.escort];

const instanceDescriptorEmployee =
  instancesDescriptor[InstancesDescriptorKeys.employee];

interface SignInOutControlListProps {
  list: ExtendedUser[];
  handleOnSelectUser: (user: ExtendedUser) => void;
}

type ListProps<T> = {
  list: T[];
  handleOnSelectUser: (user: T) => void;
};

const List = <T extends ExtendedUser>({
  list,
  handleOnSelectUser,
}: ListProps<T>) => {
  if (list.length === 0) return <></>;
  return (
    <>
      <Typography variant="h6" gutterBottom color="primary">
        {(isEscort(list[0]) && instanceDescriptorEscort.plural) ||
          instanceDescriptorEmployee.plural}
      </Typography>
      <Box>
        <Grid container>
          {list.map((user) => (
            <Grid item xs={12} sm={4} md={3} lg={2} key={user.id}>
              <Box textAlign="center" margin="3px" marginTop="3px">
                <Box
                  padding="1px"
                  border="1px solid black"
                  borderRadius="5px"
                  onClick={() => handleOnSelectUser(user)}
                >
                  <Typography variant="h6">{user.fullName}</Typography>
                  {isEscort(user) && user?.categoryName}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export const SignInOutControlList = ({
  list,
  handleOnSelectUser,
}: SignInOutControlListProps) => {
  const sortedList = list.sort((a, b) => a.fullName.localeCompare(b.fullName));
  const escorts = sortedList.filter((user) => user.userType === "A");
  const employees = sortedList.filter((user) => user.userType === "T");
  return (
    <Box>
      {Boolean(escorts.length) && (
        <List list={escorts} handleOnSelectUser={handleOnSelectUser} />
      )}
      {Boolean(employees.length) && (
        <List list={employees} handleOnSelectUser={handleOnSelectUser} />
      )}
    </Box>
  );
};
