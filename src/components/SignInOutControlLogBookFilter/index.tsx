import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { KeyboardDatePickerRange } from "@components/index";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FORM_FIELDS, FORMATS, UI } from "@utils/constants";
import { DateType } from "@date-io/type";

type MaterialUiPickersDate = DateType | null;

interface SignInOutControlLogBookFilterProps {
  dateTo: string;
  date: string;
  dateFrom: string;
  searchText: string;
  filterType: string;
  setSearchText: (text: string) => void;
  onDateFromChange: (date: MaterialUiPickersDate) => void;
  onDateToChange: (date: MaterialUiPickersDate) => void;
  onDateChange: (date: MaterialUiPickersDate) => void;
  onFilterTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SignInOutControlLogBookFilter = ({
  date,
  dateTo,
  dateFrom,
  searchText,
  filterType,
  onDateFromChange,
  setSearchText,
  onDateToChange,
  onDateChange,
  onFilterTypeChange,
  onSearch,
}: SignInOutControlLogBookFilterProps) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Buscar"
          placeholder="Buscar..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box>
          {filterType === "range" && (
            <KeyboardDatePickerRange
              toDate={dateTo}
              fromDate={dateFrom}
              onDateFromChange={onDateFromChange}
              onDateToChange={onDateToChange}
            />
          )}
          {filterType === "date" && (
            <KeyboardDatePicker
              margin="dense"
              label={FORM_FIELDS.GENERAL.LABEL_DATE}
              format={FORMATS.DATE_TIME_TO_SHOW}
              value={date}
              onChange={onDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Box marginBottom="5px">
          <Button
            onClick={onSearch}
            type="button"
            color="secondary"
            variant="contained"
          >
            {UI.BUTTON_TEXT_SEARCH}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {FORM_FIELDS.GENERAL.LABEL_FILTER_BY}
          </FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={filterType}
            value={filterType}
            onChange={onFilterTypeChange}
          >
            <FormControlLabel
              value="date"
              control={<Radio color="primary" />}
              label="Fecha"
            />
            <FormControlLabel
              value="range"
              control={<Radio color="primary" />}
              label="Rango"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SignInOutControlLogBookFilter;
