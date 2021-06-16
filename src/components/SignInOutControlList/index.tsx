import React from "react";
import { Escort } from "@dbTypes/escorts";
import { Grid, Typography, Box } from "@material-ui/core";
import { INSTANCES_NAMES } from "@utils/constants";

interface SignInOutControlListProps {
  list: Escort[];
  handleOnSelectEscort: (escort: Escort) => void;
}

const SignInOutControlList = ({
  list,
  handleOnSelectEscort,
}: SignInOutControlListProps) => {
  const sortedList = list.sort((a, b) => a.fullName.localeCompare(b.fullName));
  const escorts = sortedList.filter((user) => user.userType === "A");
  const employees = sortedList.filter((user) => user.userType === "T");
  return (
    <Box>
      {Boolean(escorts.length) && (
        <>
          <Typography variant="h6" gutterBottom color="primary">
            {INSTANCES_NAMES.ESCORT_PLURAL}
          </Typography>
          <Box>
            <Grid container>
              {escorts.map((escort) => (
                <Grid item xs={12} sm={4} md={3} lg={2} key={escort.id}>
                  <Box textAlign="center" margin="3px" marginTop="3px">
                    <Box
                      padding="1px"
                      border="1px solid black"
                      borderRadius="5px"
                      onClick={() => handleOnSelectEscort(escort)}
                    >
                      <Typography variant="h6">{escort.fullName}</Typography>
                      {escort.categoryName}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
      {Boolean(employees.length) && (
        <>
          <Typography variant="h6" gutterBottom color="primary">
            {INSTANCES_NAMES.EMPLOYEE_PLURAL}
          </Typography>
          <Box>
            <Grid container>
              {employees.map((escort) => (
                <Grid item xs={12} sm={4} md={3} lg={2} key={escort.id}>
                  <Box textAlign="center" margin="3px" marginTop="3px">
                    <Box
                      padding="1px"
                      border="1px solid black"
                      borderRadius="5px"
                      onClick={() => handleOnSelectEscort(escort)}
                    >
                      <Typography variant="h6">{escort.fullName}</Typography>
                      {escort.categoryName}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SignInOutControlList;
