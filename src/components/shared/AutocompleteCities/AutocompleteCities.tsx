import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchCities } from "@api/index";
import { CitySearch } from "@dto/geography";
import { useDebounce } from "@hooks/index";
import { CircularProgress, Autocomplete } from "@mui/material";
import { FORM_FIELDS } from "@utils/constantsUI";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CityOption {
  id: number;
  name: string;
}

interface AutocompleteCitiesProps {
  onChange: (id: number | undefined) => void;
  initialValue: CityOption | undefined;
}

export const AutocompleteCities = ({
  onChange,
  initialValue,
}: AutocompleteCitiesProps) => {
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState<CityOption | undefined>(
    initialValue
  );
  const debouncedSearchTerm = useDebounce(search, 1000);
  const { data: citiesData, refetch } = useQuery<CitySearch[], AxiosError>(
    ["cities", "create-escort"],
    () => fetchCities(debouncedSearchTerm).then((response) => response.data),
    { enabled: debouncedSearchTerm.length > 3, staleTime: 1000 }
  );

  useEffect(() => {
    if (debouncedSearchTerm.length > 3) refetch();
  }, [refetch, debouncedSearchTerm]);

  let citiesToSelect: CityOption[] =
    citiesData?.map(({ id, name, department, country }) => ({
      name: `${name} - ${department} - ${country}`,
      id,
    })) || [];
  if (initialValue) citiesToSelect = [initialValue, ...citiesToSelect];
  if (selectedOption) citiesToSelect = [selectedOption, ...citiesToSelect];

  const loading = debouncedSearchTerm !== search;
  return (
    <Autocomplete
      fullWidth
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={citiesToSelect}
      loading={loading}
      onInputChange={(_, value) => setSearch(value)}
      onChange={(_, selected) => {
        setSelectedOption(selected || undefined);
        onChange(selected?.id || undefined);
      }}
      defaultValue={initialValue}
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
