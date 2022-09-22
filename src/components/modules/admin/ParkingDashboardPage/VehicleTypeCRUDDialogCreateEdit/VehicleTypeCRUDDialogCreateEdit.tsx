import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DialogActions, Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { VehicleType } from "@dto/parking";
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
import { useValidation } from "./VehicleTypeCRUDDialogCreateEdit.hooks";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.vehicleType];

export const VehicleTypeCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<VehicleType>
> = ({
  open,
  error: mutationErrors,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<VehicleType>) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<VehicleType>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<VehicleType>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<VehicleType>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.singular,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors?.nonFieldErrors}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          onSave({ ...data, name: data.name?.toUpperCase() });
        })}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.VEHICLE_TYPE.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
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
