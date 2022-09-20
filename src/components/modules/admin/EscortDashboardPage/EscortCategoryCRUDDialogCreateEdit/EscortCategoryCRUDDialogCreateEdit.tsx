import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, DialogActions, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { EscortCategory } from "@dto/escorts";
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  UI,
  FORM_FIELDS,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import useDialogCreateEditCRUDEscortCategoryValidation from "./EscortCategoryCRUDDialogCreateEdit.hooks";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

export const EscortCategoryCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<EscortCategory>
> = ({
  open,
  error: mutationErrors,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<EscortCategory>) => {
  const resolver = useDialogCreateEditCRUDEscortCategoryValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<EscortCategory>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<EscortCategory>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<EscortCategory>(setError, mutationErrors);
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
                  label={FORM_FIELDS.ESCORT_CATEGORIES.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="order"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ESCORT_CATEGORIES.LABEL_ORDER}
                  variant="outlined"
                  helperText={formErrors?.order?.message}
                  error={Boolean(formErrors?.order)}
                  autoComplete="off"
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
