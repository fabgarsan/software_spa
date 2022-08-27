import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FORM_FIELDS, FORMATS, SYSTEM_CONFIGURATION } from "@utils/index";
import { ExtendedUser } from "@dto/users";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

import { DatePicker } from "@mui/x-date-pickers";
import { zonedTimeToUtc } from "date-fns-tz";
import { differenceInYears } from "date-fns";

interface DialogCreateEditCRUDFormExtendedUserProps {
  control: Control<ExtendedUser>;
  formErrors: FieldErrors<ExtendedUser>;
  showGender?: boolean;
}

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

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);
const today = new Date();

export const ExtendedUserCRUDDialogCreateEdit = ({
  control,
  formErrors,
  showGender,
}: DialogCreateEditCRUDFormExtendedUserProps) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={FORM_FIELDS.USER.LABEL_FIRST_NAME}
              variant="outlined"
              helperText={formErrors?.firstName?.message}
              error={Boolean(formErrors?.firstName)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={FORM_FIELDS.USER.LABEL_LAST_NAME}
              variant="outlined"
              helperText={formErrors?.lastName?.message}
              error={Boolean(formErrors?.lastName)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Controller
          name="dateOfBirth"
          control={control}
          // @ts-ignore
          defaultValue={maxDate}
          render={({ field }) => (
            <>
              <DatePicker
                maxDate={maxDate || undefined}
                label={FORM_FIELDS.EXTENDED_USER.LABEL_DATE_OF_BIRTH}
                inputFormat={FORMATS.DATE_TIME_TO_SHOW}
                value={zonedTimeToUtc(
                  field.value,
                  SYSTEM_CONFIGURATION.TIMEZONE
                )}
                onChange={field.onChange}
                // @ts-ignore
                renderInput={(props) => <TextField {...props} />}
              />
              {formErrors?.dateOfBirth ? (
                <FormHelperText className={classes.error}>
                  {formErrors.dateOfBirth.message}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  {differenceInYears(new Date(today), new Date(field.value))}{" "}
                  years
                </FormHelperText>
              )}
            </>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <Controller
          name="idType"
          control={control}
          render={({ field }) => (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="id-type-select">
                {FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE}
              </InputLabel>
              <Select
                native
                fullWidth
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  id: "id-type-select",
                }}
              >
                <option value={undefined}>-----</option>
                <option
                  value={
                    FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.CC.TYPE
                  }
                >
                  {FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.CC.TEXT}
                </option>
                <option
                  value={
                    FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.CE.TYPE
                  }
                >
                  {FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.CE.TEXT}
                </option>
                <option
                  value={
                    FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.PS.TYPE
                  }
                >
                  {FORM_FIELDS.EXTENDED_USER.LABEL_ID_TYPE_OPTIONS.PS.TEXT}
                </option>
              </Select>
              {formErrors?.idType && (
                <FormHelperText className={classes.error}>
                  {formErrors.idType.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2} lg={3}>
        <Controller
          name="idNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={FORM_FIELDS.EXTENDED_USER.LABEL_ID_NUMBER}
              variant="outlined"
              helperText={formErrors?.idNumber?.message}
              error={Boolean(formErrors?.idNumber)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={2}>
        <Controller
          name="bloodType"
          control={control}
          render={({ field }) => (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="id-blood-type">
                {FORM_FIELDS.EXTENDED_USER.LABEL_BLOOD_TYPE}
              </InputLabel>
              <Select
                fullWidth
                native
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  id: "id-blood-type",
                }}
              >
                <option value={undefined}>-----</option>
                {FORM_FIELDS.EXTENDED_USER.BLOOD_TYPE?.map((type) => (
                  <option key={type.type} value={type.type}>
                    {type.text}
                  </option>
                ))}
              </Select>
              {formErrors?.bloodType && (
                <FormHelperText className={classes.error}>
                  {formErrors.bloodType.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>
      {showGender && (
        <Grid item xs={12} sm={3} md={2} lg={2}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="id-gender-type">
                  {FORM_FIELDS.EXTENDED_USER.LABEL_GENDER_TYPE}
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    id: "id-gender-type",
                  }}
                >
                  <option value={undefined}>-----</option>
                  {FORM_FIELDS.EXTENDED_USER.GENDER_TYPE?.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.text}
                    </option>
                  ))}
                </Select>
                {formErrors?.bloodType && (
                  <FormHelperText className={classes.error}>
                    {formErrors.bloodType.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={3} md={2} lg={2}>
        <FormControlLabel
          control={
            <Controller
              name="isActive"
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
          label={FORM_FIELDS.USER.LABEL_IS_ACTIVE}
        />
      </Grid>
    </>
  );
};
ExtendedUserCRUDDialogCreateEdit.defaultProps = {
  showGender: true,
};
