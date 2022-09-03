import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, DialogActions, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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
import useDialogCreateEditCRUDValidation from "./RoomTypeCRUDDialogCreateEdit.hooks";
import { RoomType } from "@dto/room";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

export const RoomTypeCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<RoomType>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useDialogCreateEditCRUDValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<RoomType>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<RoomType>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<RoomType>(setError, mutationErrors);
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
          onSave({ ...data, name: data.name.toUpperCase() })
        )}
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
                  label={FORM_FIELDS.ROOM_TYPE.LABEL_NAME}
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
              name="value"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ROOM_TYPE.LABEL_VALUE}
                  variant="outlined"
                  helperText={formErrors?.value?.message}
                  error={Boolean(formErrors?.value)}
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
