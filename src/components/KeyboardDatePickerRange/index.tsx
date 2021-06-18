import React from "react";
import { FORMATS, FORM_FIELDS } from "@utils/constants";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateType } from "@date-io/type";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type MaterialUiPickersDate = DateType | null;

interface KeyboardDatePickerRangeProps {
  onDateFromChange: (date: MaterialUiPickersDate) => void;
  onDateToChange: (date: MaterialUiPickersDate) => void;
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

const KeyboardDatePickerRange = ({
  fromDate,
  onDateFromChange,
  toDate,
  onDateToChange,
}: KeyboardDatePickerRangeProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={6} className={classes.datePicker}>
        <KeyboardDatePicker
          className={classes.datePicker}
          margin="dense"
          label={FORM_FIELDS.GENERAL.LABEL_DATE_INITIAL}
          format={FORMATS.DATE_TIME}
          value={fromDate}
          onChange={onDateFromChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
      <Grid item xs={6} className={classes.datePicker}>
        <KeyboardDatePicker
          margin="dense"
          label={FORM_FIELDS.GENERAL.LABEL_DATE_FINAL}
          format={FORMATS.DATE_TIME}
          value={toDate}
          onChange={onDateToChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default KeyboardDatePickerRange;
