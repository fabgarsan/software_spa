import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  DialogActions,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PointOfSale } from "@dto/pointOfSale";
import { GetPointOfSale } from "@api/pointOfSale";
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  UI,
  setFormError,
  setFormValue,
  FORM_FIELDS,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import useValidation from "./DialogCreateEdit.hooks";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

export const DialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<PointOfSale>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<PointOfSale>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<PointOfSale>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<PointOfSale>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.plural,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors.nonFieldErrors}
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
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.POINT_OF_SALE.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
                />
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
              label={FORM_FIELDS.POINT_OF_SALE.LABEL_IS_ACTIVE}
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
