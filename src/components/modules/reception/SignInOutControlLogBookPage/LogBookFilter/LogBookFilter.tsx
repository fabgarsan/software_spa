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
import { DatePickerRange } from "@components/shared";
import { FORMATS, SYSTEM_CONFIGURATION } from "@utils/constants";
import { DatePicker } from "@mui/lab";
import { zonedTimeToUtc } from "date-fns-tz";
import { FORM_FIELDS, UI } from "@utils/constantsUI";

interface LogBookFilterProps {
  dateTo: string;
  date: string;
  dateFrom: string;
  searchText: string;
  filterType: string;
  setSearchText: (text: string) => void;
  onDateFromChange: (date: string | null) => void;
  onDateToChange: (date: string | null) => void;
  onDateChange: (date: string | null) => void;
  onFilterTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const LogBookFilter = ({
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
}: LogBookFilterProps) => {
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
            <DatePickerRange
              toDate={dateTo}
              fromDate={dateFrom}
              onDateFromChange={onDateFromChange}
              onDateToChange={onDateToChange}
            />
          )}
          {filterType === "date" && (
            <DatePicker
              label={FORM_FIELDS.GENERAL.LABEL_DATE}
              inputFormat={FORMATS.DATE_TIME_TO_SHOW}
              value={zonedTimeToUtc(date, SYSTEM_CONFIGURATION.TIMEZONE)}
              onChange={onDateChange}
              renderInput={(props) => <TextField {...props} />}
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
