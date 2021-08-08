import React from "react";
import { CommonLayout } from "@components/index";
import { Box, Typography } from "@material-ui/core";

type Attribute = {
  label: string;
  value: string;
};

interface DetailViewGenericProps {
  title: string;
  canView: boolean;
  children: React.ReactNode;
  attributes?: Attribute[];
}

const DetailViewGeneric: React.FunctionComponent<DetailViewGenericProps> = ({
  title,
  children,
  canView,
  attributes,
}: DetailViewGenericProps) => {
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
    </CommonLayout>
  );
};
DetailViewGeneric.defaultProps = {
  attributes: [],
};

export default DetailViewGeneric;
