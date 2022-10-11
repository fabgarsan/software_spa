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
import { useValidation } from "./TaxesCRUDDialogCreateEdit.hooks";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Tax, TaxType } from "@dto/accountingTaxes";
import { GetTaxResponse } from "@api/accountingTax";
import { formatIntoMoney } from "@utils/functions";

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.tax];

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

const typeDisplay: Record<TaxType, string> = {
  PERCENTAGE_OVER_TOTAL: "Porcentaje sobre el total",
  FIXED: "Valor Fijo",
};

const amountMessage = ({ value, type }: { value: number; type: TaxType }) => {
  if (type === "PERCENTAGE_OVER_TOTAL") {
    return `${parseFloat((value * 100).toString()).toFixed(2)}%`;
  }
  if (type === "FIXED") {
    return formatIntoMoney(value);
  }
};

export const TaxesCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<GetTaxResponse, Tax>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
    getValues,
  } = useForm<Tax>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<Tax>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<Tax>(setError, mutationErrors);
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
          <Grid container item xs={12}>
            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.ACCOUNTING_TAXES.LABEL_NAME}
                    variant="outlined"
                    helperText={formErrors?.name?.message}
                    error={Boolean(formErrors?.name)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-type-select">
                      {FORM_FIELDS.ACCOUNTING_TAXES.LABEL_TYPE}
                    </InputLabel>
                    <Select
                      fullWidth
                      native
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{
                        id: "id-type-select",
                      }}
                    >
                      <option value={undefined}>-----</option>
                      {Object.entries(typeDisplay).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Select>
                    {formErrors?.type && (
                      <FormHelperText className={classes.error}>
                        {formErrors.type.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="amount"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.ACCOUNTING_TAXES.LABEL_AMOUNT_PERCENTAGE}
                    variant="outlined"
                    helperText={
                      formErrors?.amount?.message ||
                      amountMessage({
                        value: field.value,
                        type: getValues("type"),
                      })
                    }
                    type="number"
                    error={Boolean(formErrors?.amount)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
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
