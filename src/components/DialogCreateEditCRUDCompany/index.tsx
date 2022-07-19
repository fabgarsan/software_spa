import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DialogActions, Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Company } from "@dto/companies";
import { DialogCreateEditBase } from "@components/index";
import {
  DIALOG_MESSAGES,
  INSTANCES_NAMES,
  UI,
  setFormError,
  setFormValue,
  FORM_FIELDS,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import useValidation from "./DialogCreateEditCRUDCompany.hooks";

const DialogCreateEditCRUDCompany: React.FunctionComponent<
  CRUDDefaultFormProps<Company>
> = ({
  open,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<Company>) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<Company>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<Company>(setValue, instance);
    }
  }, [instance, setValue]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        INSTANCES_NAMES.COMPANY_PLURAL,
        Boolean(instance)
      )}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          try {
            await onSave({
              ...data,
              name: data.name.toUpperCase(),
            });
          } catch (errors) {
            setFormError<Company>(setError, errors);
          }
        })}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="nit"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.COMPANY.LABEL_NIT}
                  variant="outlined"
                  helperText={formErrors?.nit?.message}
                  error={Boolean(formErrors?.nit)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.COMPANY.LABEL_NAME}
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

export default DialogCreateEditCRUDCompany;
