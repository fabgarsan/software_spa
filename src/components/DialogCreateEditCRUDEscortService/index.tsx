import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, DialogActions, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { EscortService } from "@dto/escorts";
import { DialogCreateEditBase } from "@components/index";
import {
  DIALOG_MESSAGES,
  INSTANCES_NAMES,
  UI,
  FORM_FIELDS,
  setFormError,
  setFormValue,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import useValidation from "./DialogCreateEditCRUDEscortService.validation";

const DialogCreateEditEscortService: React.FunctionComponent<
  CRUDDefaultFormProps<EscortService>
> = ({
  open,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<EscortService>) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<EscortService>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<EscortService>(setValue, instance);
    }
  }, [instance, setValue]);
  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        INSTANCES_NAMES.ESCORT_SERVICE_SINGULAR,
        Boolean(instance)
      )}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          try {
            await onSave({
              ...data,
              name: data.name?.toUpperCase(),
              nameEn: data.nameEn?.toUpperCase(),
            });
          } catch (errors) {
            setFormError<EscortService>(setError, errors);
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
                  label={FORM_FIELDS.ESCORT_SERVICES.LABEL_NAME}
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
              name="nameEn"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ESCORT_SERVICES.LABEL_NAME_EN}
                  variant="outlined"
                  helperText={formErrors?.nameEn?.message}
                  error={Boolean(formErrors?.nameEn)}
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

export default DialogCreateEditEscortService;
