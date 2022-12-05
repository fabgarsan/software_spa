import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { OtpCodeModal } from "@components/shared/OtpManagement/OtpCodeModal";
import { useFetchOptCodesQuery } from "@components/shared/OtpManagement/OtpManagementl.hooks";
import Button from "@mui/material/Button";
import { UI } from "@utils/constantsUI";
import { OtpCodeItem } from "@components/shared/OtpManagement/OtpCodeItem";

interface OtpManagementProps {
  userId?: number;
}

export const OtpManagement: React.FunctionComponent<OtpManagementProps> = ({
  userId,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const fetchOptCodesQuery = useFetchOptCodesQuery({
    userId,
  });
  const { data: fetchOptCodesQueryData, refetch } = fetchOptCodesQuery;

  return (
    <>
      <Typography variant="h6" color="primary">
        Dispositivos Autorizados
      </Typography>
      {openModal && (
        <OtpCodeModal
          userId={userId}
          open={openModal}
          close={() => {
            refetch();
            setOpenModal(false);
          }}
        />
      )}
      <Grid item container xs={12} spacing={2}>
        {fetchOptCodesQueryData?.map(
          ({ created, id, validationCount, deviceName }) => (
            <Grid key={id} item xs={6} md={3} xl={2} textAlign="center">
              <OtpCodeItem
                created={created}
                validationCount={validationCount}
                deviceName={deviceName}
                id={id}
              />
            </Grid>
          )
        )}
      </Grid>
      <Box mt={2} textAlign="left">
        <Button
          color="secondary"
          onClick={() => setOpenModal(true)}
          variant="contained"
        >
          {UI.BUTTON_TEXT_ADD}
        </Button>
      </Box>
    </>
  );
};
