import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DialogActions, Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ParkingRate } from "@dto/parking";
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  UI,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
  FORM_FIELDS,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import { useValidation } from "./ParkingRateCRUDDialogCreateEdit.hooks";
import { useParams } from "react-router-dom";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.vehicleType];

export const ParkingRateCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<ParkingRate>
> = ({
  open,
  error: mutationErrors,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<ParkingRate>) => {
  const resolver = useValidation();
  const { id: parkingPlanId } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<ParkingRate>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<ParkingRate>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<ParkingRate>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.singular,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors.nonFieldErrors}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          onSave({
            ...data,
            parking_plan: (parkingPlanId && Number(parkingPlanId)) || 0,
          })
        )}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="minutes"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PARKING_RATE.LABEL_MINUTES}
                  variant="outlined"
                  helperText={formErrors?.minutes?.message}
                  error={Boolean(formErrors?.minutes)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Controller
              name="value"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PARKING_RATE.LABEL_VALUE}
                  variant="outlined"
                  helperText={formErrors?.value?.message}
                  error={Boolean(formErrors?.value)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {UI.BUTTON_TEXT_CANCEL}
          </Button>
          <Button color="secondary" type="submit">
            {UI.BUTTON_TEXT_SAVE}
          </Button>
        </DialogActions>
      </Box>
    </DialogCreateEditBase>
  );
};
