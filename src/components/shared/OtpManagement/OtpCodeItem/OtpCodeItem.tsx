import { Box, IconButton, Paper, Typography } from "@mui/material";
import { toHumanDateTime } from "@utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { DialogConfirmation } from "@components/shared";
import { useDeleteOTPCodeMutation } from "@components/shared/OtpManagement/OtpCodeItem/OtpCodeItem.hooks";
import { useQueryClient } from "@tanstack/react-query";

interface OtpCodeItemProps {
  deviceName: string;
  created: string;
  validationCount: number;
  id: number;
}

const Item = styled(Paper)(() => ({
  textAlign: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
}));

export const OtpCodeItem: React.FunctionComponent<OtpCodeItemProps> = ({
  deviceName,
  validationCount,
  created,
  id,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { mutate: createDeleteMutation } = useDeleteOTPCodeMutation({
    onSuccessCallBack: () => {
      setOpenModal(false);
      queryClient.invalidateQueries(["otp-codes"]);
    },
  });
  return (
    <>
      <DialogConfirmation
        open={openModal}
        message="Desea eliminar el dispositivo de autenticación?"
        onAccept={() => createDeleteMutation(id)}
        onCancel={() => setOpenModal(false)}
        title={`Eliminar dispositivo ${deviceName}`}
      />
      <Item elevation={3}>
        <Typography variant="subtitle1">{deviceName}</Typography>
        <Typography
          component="span"
          variant="caption"
          color="text.primary"
          display="block"
        >
          Creado: {toHumanDateTime(created)}
        </Typography>
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
          display="block"
        >
          Usado: {validationCount} veces
        </Typography>
        <Box paddingRight={3} textAlign="right">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenModal(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <FontAwesomeIcon icon={["fal", "trash"]} size="lg" />
          </IconButton>
        </Box>
      </Item>
    </>
  );
};
