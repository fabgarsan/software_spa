import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

interface TabManagerProps {
  title: string;
  labels: string[];
  children: React.FunctionComponent<{ tabIndex: number }>;
}

export const TabManager = ({ labels, title, children }: TabManagerProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        {title}
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {labels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      {children({ tabIndex })}
    </Box>
  );
};
