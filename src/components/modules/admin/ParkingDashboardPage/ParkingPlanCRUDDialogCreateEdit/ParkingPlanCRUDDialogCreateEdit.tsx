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
  SYSTEM_CONFIGURATION,
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

import { zonedTimeToUtc } from "date-fns-tz";
import { GetParkingPlan } from "@api/parking";

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
  CRUDDefaultFormProps<GetParkingPlan, ParkingPlan>
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
      nonFieldErrors={mutationErrors.nonFieldErrors}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          onSave({
            ...data,
            // @ts-ignore
            timeFrom: zonedTimeToUtc(
              data.timeFrom,
              SYSTEM_CONFIGURATION.TIMEZONE
            ).toISOString(),
            name: data.name.toUpperCase(),
          })
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-category-select">
                    {FORM_FIELDS.PARKING_PLAN.LABEL_VEHICLE_TYPE}
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
          <FormControlLabel
            control={
              <Controller
                name="timeFrom"
                control={control}
                render={({ field }) => (
                  <DesktopTimePicker
                    label="For desktop"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
            }
            label={FORM_FIELDS.PARKING_PLAN.LABEL_TIME_FROM}
          />
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
