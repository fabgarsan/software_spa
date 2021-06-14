import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";

interface TabManagerProps {
  title: string;
  labels: string[];
  children: React.FunctionComponent<{ tabIndex: number }>;
}

const TabManager = ({ labels, title, children }: TabManagerProps) => {
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
      >
        {labels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      {children({ tabIndex })}
    </Box>
  );
};

export default TabManager;
