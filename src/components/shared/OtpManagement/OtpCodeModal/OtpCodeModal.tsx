import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import QRCode from "react-qr-code";
import {
  useCreateNewOTPByUserMutation,
  useCreateNewOTPCurrentUserMutation,
  useGenerateNewOTPQuery,
  useValidation,
} from "@components/shared/OtpManagement/OtpCodeModal/index";
import { Controller, useForm } from "react-hook-form";
import { setFormError } from "@utils/functions";

interface GetNewOTPCodeForRequest {
  token: string;
}

interface OtpCodeModalProps {
  open: boolean;
  userId?: number;
  close: () => void;
}

export const OtpCodeModal: React.FunctionComponent<OtpCodeModalProps> = ({
  open,
  close,
  userId,
}) => {
  const resolver = useValidation();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setError,
  } = useForm<GetNewOTPCodeForRequest>({ resolver });

  const generateNewOTPQuery = useGenerateNewOTPQuery(userId);

  const { data: generateNewOTPQueryData, isLoading } = generateNewOTPQuery;

  const {
    mutate: createOTPCodeCurrentUserMutation,
    error: mutationErrorsByCurrentUser,
  } = useCreateNewOTPCurrentUserMutation({
    onSuccessCallBack: () => {
      close();
    },
  });

  const { mutate: createOTPCodeByUserMutation, error: mutationErrorsByUser } =
    useCreateNewOTPByUserMutation({
      userId,
      onSuccessCallBack: () => {
        close();
      },
    });

  const mutationErrors =
    (userId && mutationErrorsByUser) || mutationErrorsByCurrentUser;

  useEffect(() => {
    setFormError<GetNewOTPCodeForRequest>(
      setError,
      mutationErrors?.response?.data
    );
  }, [setError, mutationErrors]);

  if (isLoading) return <Box>Descargando...</Box>;
  if (!generateNewOTPQueryData) return null;
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Token Operaciones</DialogTitle>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          const mutationFunction =
            (userId && createOTPCodeByUserMutation) ||
            createOTPCodeCurrentUserMutation;
          mutationFunction({
            token: data.token,
            code: generateNewOTPQueryData.code,
            deviceName: generateNewOTPQueryData.deviceName,
          });
        })}
      >
        <DialogContent>
          <Box textAlign="center">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "250px", width: "100%" }}
              value={generateNewOTPQueryData.url}
              viewBox={`0 0 256 256`}
            />
          </Box>
          <Box mt={4}>
            <Controller
              name="token"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Token"
                  variant="outlined"
                  helperText={formErrors?.token?.message}
                  error={Boolean(formErrors?.token)}
                  autoComplete="off"
                  value={field.value}
                  InputProps={{
                    style: { fontSize: 25 },
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
