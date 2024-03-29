import React from "react";
import { CommonLayout } from "@components/shared";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Attribute = {
  label: string;
  value: string | React.ReactNode;
};

interface DetailViewGenericProps {
  title: string;
  canView: boolean;
  goBackButton?: boolean;
  children: React.ReactNode;
  attributes?: Attribute[];
}

export const DetailViewGeneric: React.FunctionComponent<
  DetailViewGenericProps
> = ({
  title,
  children,
  canView,
  attributes,
  goBackButton,
}: DetailViewGenericProps) => {
  const navigate = useNavigate();
  return (
    <CommonLayout title={title} canView={canView}>
      {attributes && attributes?.length > 0 && (
        <Box display="flex" flexWrap="wrap">
          {attributes.map(
            (att) =>
              att.value && (
                <Box paddingLeft={1} paddingRight={1} key={att.label}>
                  <Typography variant="overline" color="primary">
                    {att.label}:
                  </Typography>
                  {att.value}
                </Box>
              )
          )}
        </Box>
      )}
      {children}
      {goBackButton && (
        <Box textAlign="right">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>
      )}
    </CommonLayout>
  );
};
DetailViewGeneric.defaultProps = {
  attributes: [],
  goBackButton: true,
};
