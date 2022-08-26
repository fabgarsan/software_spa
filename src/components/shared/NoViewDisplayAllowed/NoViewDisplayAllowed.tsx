import React from "react";
import { Box, Typography } from "@mui/material";
import { CONTAINERS } from "@utils/constants";

interface NoViewDisplayAllowedProps {
  instanceNamePlural: string;
}

export const NoViewDisplayAllowed = ({
  instanceNamePlural,
}: NoViewDisplayAllowedProps) => {
  return (
    <Box marginTop={5}>
      <Typography variant="h6" gutterBottom>
        {CONTAINERS.WITHOUT_ANY_PERMISSION_TO_DISPLAY} {instanceNamePlural}
      </Typography>
    </Box>
  );
};
