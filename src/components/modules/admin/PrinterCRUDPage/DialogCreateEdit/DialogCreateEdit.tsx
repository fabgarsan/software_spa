import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Printer } from "@dto/sysConfiguration";
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  FORM_FIELDS,
  instancesDescriptor,
  InstancesDescriptorKeys,
  setFormError,
  setFormValue,
  UI,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import { useValidation } from "./DialogCreateEdit.hooks";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.printer];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

export const DialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<Printer>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const classes = useStyles();
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<Printer>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<Printer>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<Printer>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.plural,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors?.nonFieldErrors}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          onSave({
            ...data,
            name: data.name.toUpperCase(),
          });
        })}
      >
        <Grid container>
          <Grid item xs={12} md={6} xl={4}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PRINTERS.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Controller
              name="ipAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PRINTERS.LABEL_IP_ADDRESS}
                  variant="outlined"
                  helperText={formErrors?.ipAddress?.message}
                  error={Boolean(formErrors?.ipAddress)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Controller
              name="model"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PRINTERS.LABEL_MODEL}
                  variant="outlined"
                  helperText={formErrors?.model?.message}
                  error={Boolean(formErrors?.model)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-brand-select">
                    {FORM_FIELDS.PRINTERS.LABEL_BRAND}
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-brand-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    <option value="EPSON">Epson</option>
                  </Select>
                  {formErrors?.brand && (
                    <FormHelperText className={classes.error}>
                      {formErrors.brand.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <FormControlLabel
              control={
                <Controller
                  name="active"
                  defaultValue
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={FORM_FIELDS.PRINTERS.LABEL_IS_ACTIVE}
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
