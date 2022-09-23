import { DialogCreateEditBase } from "@components/shared";
import React, { useEffect } from "react";
import { Box, DialogActions, Grid, TextField } from "@mui/material";

import {
  useCreateParkingServiceMutation,
  useValidation,
} from "./CreateServiceDialog.hooks";
import { Controller, useForm } from "react-hook-form";
import { UI } from "@utils/constantsUI";
import Button from "@mui/material/Button";
import { ParkingPlan } from "@dto/parking";
import {
  removeNonAlphanumericCharactersFromString,
  setFormError,
} from "@utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@mui/lab";

type CreateParkingServiceRequest = {
  writeLicensePlate: string;
};

interface CreateServiceDialogProps {
  onClose: () => void;
  open: boolean;
  selectedPlan: ParkingPlan;
}

export const CreateServiceDialog: React.FunctionComponent<
  CreateServiceDialogProps
> = ({ onClose, open, selectedPlan }) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setError,
  } = useForm<CreateParkingServiceRequest>({ resolver });

  const {
    mutate: createParkingServiceMutate,
    error: mutationErrors,
    isLoading: createParkingServiceMutateIsLoading,
  } = useCreateParkingServiceMutation({
    parkingPlan: selectedPlan.id,
    onSuccessCallBack: () => onClose(),
  });

  useEffect(() => {
    setFormError<CreateParkingServiceRequest>(
      setError,
      mutationErrors?.response?.data
    );
  }, [setError, mutationErrors]);
  return (
    <DialogCreateEditBase
      open={open}
      title="Adicionar servicio de parqueo"
      nonFieldErrors={mutationErrors?.response?.data?.nonFieldErrors}
      maxWidth="xs"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) =>
          createParkingServiceMutate(
            removeNonAlphanumericCharactersFromString(
              data.writeLicensePlate.toUpperCase()
            )
          )
        )}
      >
        <Controller
          name="writeLicensePlate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Placa"
              variant="outlined"
              helperText={formErrors?.writeLicensePlate?.message}
              error={Boolean(formErrors?.writeLicensePlate)}
              autoComplete="off"
              value={removeNonAlphanumericCharactersFromString(
                field.value.toUpperCase()
              )}
              InputProps={{
                style: { fontSize: 55 },
              }}
            />
          )}
        />
        <DialogActions>
          <Grid container textAlign="center" spacing={3} height={120}>
            <Grid item xs={6}>
              <Button
                onClick={onClose}
                color="primary"
                variant="contained"
                fullWidth
                style={{ height: "100%" }}
                disabled={createParkingServiceMutateIsLoading}
              >
                {UI.BUTTON_TEXT_CANCEL}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                color="secondary"
                type="submit"
                variant="contained"
                fullWidth
                style={{ height: "100%" }}
                loading={createParkingServiceMutateIsLoading}
                loadingPosition="start"
                endIcon={<FontAwesomeIcon icon={["fal", "sign-in"]} />}
              >
                {UI.BUTTON_TEXT_START}
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </DialogCreateEditBase>
  );
};
