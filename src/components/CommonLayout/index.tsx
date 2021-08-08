import React from "react";
import { NoViewDisplayAllowed } from "@components/index";
import { Box, Typography } from "@material-ui/core";

interface CommonLayoutProps {
  title: string;
  canView: boolean;
  children: React.ReactNode;
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
}

const CommonLayout = ({
  title,
  canView,
  children,
  color,
}: CommonLayoutProps) => {
  if (!canView) {
    return <NoViewDisplayAllowed instanceNamePlural={title} />;
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom color={color}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
CommonLayout.defaultProps = {
  color: "primary",
};

export default CommonLayout;
