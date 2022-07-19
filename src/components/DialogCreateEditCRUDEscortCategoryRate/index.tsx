import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, DialogActions, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { EscortCategoryRate } from "@dto/escorts";
import { DialogCreateEditBase } from "@components/index";
import {
  DIALOG_MESSAGES,
  UI,
  FORM_FIELDS,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import useDialogCreateEditCRUDEscortCategoryValidation from "./DialogCreateEditCRUDEscortCategory.validation";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

const DialogCreateEditEscortCategory: React.FunctionComponent<
  CRUDDefaultFormProps<EscortCategoryRate>
> = ({
  open,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<EscortCategoryRate>) => {
  const resolver = useDialogCreateEditCRUDEscortCategoryValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<EscortCategoryRate>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<EscortCategoryRate>(setValue, instance);
    }
  }, [instance, setValue]);
  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.singular,
        Boolean(instance)
      )}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          try {
            await onSave({ ...data, name: data.name?.toUpperCase() });
          } catch (errors) {
            setFormError<EscortCategoryRate>(setError, errors);
          }
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
              name="minutes"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ESCORT_CATEGORIES.LABEL_ORDER}
                  variant="outlined"
                  helperText={formErrors?.minutes?.message}
                  error={Boolean(formErrors?.minutes)}
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

export default DialogCreateEditEscortCategory;
