import React from "react";
import { NoViewDisplayAllowed } from "@components/index";
import { Box, Typography } from "@material-ui/core";

interface CommonLayoutProps {
  title: string;
  canView: boolean;
  children: React.ReactNode;
}

const CommonLayout = ({ title, canView, children }: CommonLayoutProps) => {
  if (!canView) {
    return <NoViewDisplayAllowed instanceNamePlural={title} />;
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default CommonLayout;
