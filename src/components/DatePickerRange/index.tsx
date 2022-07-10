import React from "react";
import { FORMATS, FORM_FIELDS, SYSTEM_CONFIGURATION } from "@utils/constants";
import { DatePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { zonedTimeToUtc } from "date-fns-tz";

interface DatePickerRangeProps {
  onDateFromChange: (date: string | null) => void;
  onDateToChange: (date: string | null) => void;
  fromDate: string;
  toDate: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      "& > *": {
        marginLeft: theme.spacing(1),
      },
    },
  })
);

const DatePickerRange = ({
  fromDate,
  onDateFromChange,
  toDate,
  onDateToChange,
}: DatePickerRangeProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={6} className={classes.datePicker}>
        <DatePicker
          className={classes.datePicker}
          label={FORM_FIELDS.GENERAL.LABEL_DATE_INITIAL}
          inputFormat={FORMATS.DATE_TIME_TO_SHOW}
          value={zonedTimeToUtc(fromDate, SYSTEM_CONFIGURATION.TIMEZONE)}
          onChange={onDateFromChange}
          renderInput={(props) => <TextField {...props} />}
        />
      </Grid>
      <Grid item xs={6} className={classes.datePicker}>
        <DatePicker
          label={FORM_FIELDS.GENERAL.LABEL_DATE_FINAL}
          inputFormat={FORMATS.DATE_TIME_TO_SHOW}
          value={zonedTimeToUtc(toDate, SYSTEM_CONFIGURATION.TIMEZONE)}
          onChange={onDateToChange}
          renderInput={(props) => <TextField {...props} />}
        />
      </Grid>
    </Grid>
  );
};

export default DatePickerRange;
