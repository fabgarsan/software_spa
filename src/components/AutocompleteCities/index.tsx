import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fetchCities } from "@api/index";
import { CitySearch } from "../../dto/geography";
import { useDebounce } from "@hooks/index";
import { Box, CircularProgress } from "@material-ui/core";
import { FORM_FIELDS } from "@utils/constants";

interface CityOption {
  id: number;
  name: string;
}

interface AutocompleteCitiesProps {
  onChange: (id: number | undefined) => void;
  initialValue: CityOption | undefined;
}

const AutocompleteCities = ({
  onChange,
  initialValue,
}: AutocompleteCitiesProps) => {
  const [cities, setCities] = useState<CitySearch[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState<CityOption | undefined>(
    initialValue
  );
  const debouncedSearchTerm = useDebounce(search, 1000);
  useEffect(() => {
    const getCities = async () => {
      const response = await fetchCities(debouncedSearchTerm);
      setCities(response.data);
    };
    if (debouncedSearchTerm.length > 3) {
      getCities();
    } else {
      setCities([]);
    }
  }, [debouncedSearchTerm]);
  let citiesToSelect: CityOption[] = cities.map(
    ({ id, name, department, country }) => ({
      name: `${name} - ${department} - ${country}`,
      id,
    })
  );
  if (initialValue) citiesToSelect = [initialValue, ...citiesToSelect];
  if (selectedOption) citiesToSelect = [selectedOption, ...citiesToSelect];

  const loading = debouncedSearchTerm !== search;
  return (
    <Autocomplete
      fullWidth
      options={citiesToSelect}
      getOptionLabel={(option) => option.name}
      onInputChange={(_, value) => setSearch(value)}
      onChange={(_, selected) => {
        setSelectedOption(selected || undefined);
        onChange(selected?.id || undefined);
      }}
      defaultValue={initialValue}
      getOptionSelected={(option, value) => option.name === value.name}
      renderOption={(option) => <Box component="span">{option.name}</Box>}
      renderInput={(params) => (
        <TextField
          {...params}
          label={FORM_FIELDS.EXTENDED_USER.LABEL_CITY}
          fullWidth
          variant="outlined"
          value={search}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
export default AutocompleteCities;
