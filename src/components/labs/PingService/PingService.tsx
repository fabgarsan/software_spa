import React from "react";
import { Box, TextField } from "@mui/material";
import { useValidation } from "./PingService.hooks";
import { Controller, useForm } from "react-hook-form";
import { FORM_FIELDS } from "@utils/constantsUI";
import Button from "@mui/material/Button";

export const PingService = () => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<{ host: string }>({ resolver });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log(data, "LA DATA AQUI");
      })}
    >
      <Controller
        name="host"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Host (IP Address or URL)"
            variant="outlined"
            helperText={formErrors?.host?.message}
            error={Boolean(formErrors?.host)}
            autoComplete="off"
            value={field.value?.toUpperCase()}
          />
        )}
      />
      <Button color="secondary" type="submit" variant="contained">
        Ping Host/Url
      </Button>
    </Box>
  );
};
