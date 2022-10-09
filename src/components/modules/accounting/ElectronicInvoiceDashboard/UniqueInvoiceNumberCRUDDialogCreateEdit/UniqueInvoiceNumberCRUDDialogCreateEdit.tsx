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
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  FORM_FIELDS,
  FORMATS,
  instancesDescriptor,
  InstancesDescriptorKeys,
  setFormError,
  setFormValue,
  SYSTEM_CONFIGURATION,
  UI,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import { useValidation } from "./UniqueInvoiceNumberCRUDDialogCreateEdit.hooks";
import { UniqueInvoiceNumber } from "@dto/accountingInvoice";
import { DatePicker } from "@mui/x-date-pickers";
import { utcToZonedTime } from "date-fns-tz";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useCompaniesQuery } from "@api/company";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.uniqueInvoiceNumber];

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

const today = new Date();

export const UniqueInvoiceNumberCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<UniqueInvoiceNumber>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<UniqueInvoiceNumber>({ resolver });
  const companiesQuery = useCompaniesQuery();
  const { data: companiesData } = companiesQuery;
  useEffect(() => {
    if (instance) {
      setFormValue<UniqueInvoiceNumber>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<UniqueInvoiceNumber>(setError, mutationErrors);
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
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="dianResolutionNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={
                      FORM_FIELDS.UNIQUE_INVOICE_NUMBER
                        .LABEL_DIAN_RESOLUTION_NUMBER
                    }
                    variant="outlined"
                    helperText={formErrors?.dianResolutionNumber?.message}
                    error={Boolean(formErrors?.dianResolutionNumber)}
                    autoComplete="off"
                    value={field.value?.toUpperCase()}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-category-select">
                      {FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_COMPANY}
                    </InputLabel>
                    <Select
                      fullWidth
                      native
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{
                        id: "id-category-select",
                      }}
                    >
                      <option value={undefined}>-----</option>
                      {companiesData?.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </Select>
                    {formErrors?.company && (
                      <FormHelperText className={classes.error}>
                        {formErrors.company.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6} md={3} lg={2}>
              <Controller
                name="start"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_START}
                    variant="outlined"
                    helperText={formErrors?.start?.message}
                    error={Boolean(formErrors?.start)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Controller
                name="end"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_END}
                    variant="outlined"
                    helperText={formErrors?.end?.message}
                    error={Boolean(formErrors?.end)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Controller
                name="prefix"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_PREFIX}
                    variant="outlined"
                    helperText={formErrors?.prefix?.message}
                    error={Boolean(formErrors?.prefix)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Controller
                name="currentNumber"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={
                      FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_CURRENT_NUMBER
                    }
                    variant="outlined"
                    helperText={formErrors?.currentNumber?.message}
                    error={Boolean(formErrors?.currentNumber)}
                    autoComplete="off"
                    value={field.value}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <Controller
              name="authorizationDateStart"
              control={control}
              // @ts-ignore
              defaultValue={today}
              render={({ field }) => (
                <>
                  <DatePicker
                    maxDate={undefined}
                    label={FORM_FIELDS.EXTENDED_USER.LABEL_DATE_OF_BIRTH}
                    inputFormat={FORMATS.DATE_TIME_TO_SHOW}
                    value={utcToZonedTime(
                      field.value,
                      SYSTEM_CONFIGURATION.TIMEZONE
                    )}
                    onChange={field.onChange}
                    // @ts-ignore
                    renderInput={(props) => <TextField {...props} />}
                  />
                  {formErrors?.authorizationDateStart && (
                    <FormHelperText className={classes.error}>
                      {formErrors.authorizationDateStart.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
              label={FORM_FIELDS.UNIQUE_INVOICE_NUMBER.LABEL_IS_ACTIVE}
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
