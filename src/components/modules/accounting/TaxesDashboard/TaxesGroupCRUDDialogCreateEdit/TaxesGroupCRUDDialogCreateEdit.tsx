import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
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
import { useValidation } from "./TaxesGroupCRUDDialogCreateEdit.hooks";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { TaxGroup } from "@dto/accountingTaxes";
import { GetTaxGroupResponse, useTaxesQuery } from "@api/accountingTax";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.taxGroup];

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

export const TaxesGroupCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<GetTaxGroupResponse, TaxGroup>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<TaxGroup>({ resolver });

  const taxQuery = useTaxesQuery();
  const { data: taxQueryData } = taxQuery;

  useEffect(() => {
    if (instance) {
      setFormValue<TaxGroup>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<TaxGroup>(setError, mutationErrors);
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
        onSubmit={handleSubmit((data) =>
          onSave({ ...data, name: data.name.toUpperCase() })
        )}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ACCOUNTING_TAXES_GROUP.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="tax"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-tax-select">
                    {FORM_FIELDS.ACCOUNTING_TAXES_GROUP.LABEL_TAX}
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-tax-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    {taxQueryData?.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.name}
                      </option>
                    ))}
                  </Select>
                  {formErrors?.tax && (
                    <FormHelperText className={classes.error}>
                      {formErrors.tax.message}
                    </FormHelperText>
                  )}
                </FormControl>
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
