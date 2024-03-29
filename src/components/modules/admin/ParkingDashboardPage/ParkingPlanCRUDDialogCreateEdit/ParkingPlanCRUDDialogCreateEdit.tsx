import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  DialogActions,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ParkingPlan } from "@dto/parking";
import { DialogCreateEditBase } from "@components/shared";
import {
  DIALOG_MESSAGES,
  UI,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
  FORM_FIELDS,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import {
  useValidation,
  useVehiclesTypesQuery,
} from "./ParkingPlanCRUDDialogCreateEdit.hooks";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { DesktopTimePicker } from "@mui/x-date-pickers";

import { CreateParkingPlanRequest, GetParkingPlanResponse } from "@api/parking";
import { useTaxesGroupsQuery } from "@api/accountingTax";
import { toHoursMinutesFormatFromDate } from "@utils/functions";
import { useUniqueInvoiceNumbersQuery } from "@api/accounting";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.parkingPlan];

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

const weekDays: (
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const ParkingPlanCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<GetParkingPlanResponse, CreateParkingPlanRequest>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<ParkingPlan>({ resolver });

  const { data: vehicleTypesData } = useVehiclesTypesQuery();
  const { data: taxesGroupsQueryData } = useTaxesGroupsQuery();

  const uniqueInvoiceNumbersQuery = useUniqueInvoiceNumbersQuery();
  const { data: uniqueInvoiceNumbersDataQuery } = uniqueInvoiceNumbersQuery;

  useEffect(() => {
    if (instance) {
      setFormValue<ParkingPlan>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<ParkingPlan>(setError, mutationErrors);
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
          onSave({
            ...data,
            timeFrom: toHoursMinutesFormatFromDate(data.timeFrom),
            timeTo: toHoursMinutesFormatFromDate(data.timeTo),
            name: data.name.toUpperCase(),
          })
        )}
      >
        <Grid container>
          <Grid item xs={12} md={8}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.PARKING_PLAN.LABEL_NAME}
                  variant="outlined"
                  helperText={formErrors?.name?.message}
                  error={Boolean(formErrors?.name)}
                  autoComplete="off"
                  value={field.value?.toUpperCase()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="uniqueInvoiceNumber"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-printer-select">
                    {FORM_FIELDS.POINT_OF_SALE.LABEL_UNIQUE_INVOICE_NUMBER}
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={field.value || undefined}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-unique-invoice-number-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    {uniqueInvoiceNumbersDataQuery?.map(
                      ({
                        id: uniqueInvoiceNumberId,
                        companyName,
                        dianResolutionNumber,
                      }) => (
                        <option
                          key={uniqueInvoiceNumberId}
                          value={uniqueInvoiceNumberId}
                        >
                          {companyName} ({dianResolutionNumber})
                        </option>
                      )
                    )}
                  </Select>
                  {formErrors?.uniqueInvoiceNumber && (
                    <FormHelperText className={classes.error}>
                      {formErrors.uniqueInvoiceNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-vehicle-type-select">
                    {FORM_FIELDS.PARKING_PLAN.LABEL_VEHICLE_TYPE}
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-vehicle-type-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    {vehicleTypesData?.map((vehicleType) => (
                      <option key={vehicleType.id} value={vehicleType.id}>
                        {vehicleType.name}
                      </option>
                    ))}
                  </Select>
                  {formErrors?.vehicleType && (
                    <FormHelperText className={classes.error}>
                      {formErrors.vehicleType.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="taxGroup"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-tax-group-select">
                    {FORM_FIELDS.PARKING_PLAN.LABEL_TAX_GROUP}
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-tax-group-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    {taxesGroupsQueryData?.map((taxGroup) => (
                      <option key={taxGroup.id} value={taxGroup.id}>
                        {taxGroup.name}
                      </option>
                    ))}
                  </Select>
                  {formErrors?.taxGroup && (
                    <FormHelperText className={classes.error}>
                      {formErrors.taxGroup.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item container xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="timeFrom"
                  control={control}
                  render={({ field }) => (
                    <DesktopTimePicker
                      label="Tiempo de Inicio"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              }
              label={FORM_FIELDS.PARKING_PLAN.LABEL_TIME_FROM}
            />
            <FormControlLabel
              control={
                <Controller
                  name="timeTo"
                  control={control}
                  render={({ field }) => (
                    <DesktopTimePicker
                      label="Tiempo de Cierre"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              }
              label={FORM_FIELDS.PARKING_PLAN.LABEL_TIME_TO}
            />
          </Grid>
          <Grid item container xs={12}>
            {weekDays.map((day) => {
              return (
                <Grid key={day} item xs={12} sm={3} md={2} lg={2}>
                  <FormControlLabel
                    control={
                      <Controller
                        name={day}
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
                    label={
                      // @ts-ignore
                      FORM_FIELDS.PARKING_PLAN[`LABEL_${day.toUpperCase()}`]
                    }
                  />
                </Grid>
              );
            })}
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
