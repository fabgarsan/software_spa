// https://github.com/rubenruvalcabac/epson-epos-sdk-react
// https://c4b.epson-biz.com/modules/community/index.php?content_id=91
import React, { useEffect } from "react";
import { useValidation } from "@components/labs/ThermalPrinter/ThermalPrinter.hooks";
import { useEpsonPrinter } from "@hooks/useEpsonPrinter";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const ThermalPrinter = () => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<{
    textToPrint: string;
  }>({ resolver });
  const { printer, isAvailableToPrint, setPrinting, connect } =
    useEpsonPrinter();
  useEffect(
    () => {
      connect({
        printerIPAddress: "192.168.0.11",
        printerPort: 8008,
      });
    },
    // eslint-disable-next-line
    []
  );
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(async ({ textToPrint }) => {
          if (printer) {
            setPrinting();
            printer.addTextLang("es");
            printer.addTextAlign("center");
            printer.addTextFont("font_a");
            printer.addText(`${textToPrint}\n`);
            printer.send();
          }
        })}
      >
        <Controller
          name="textToPrint"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              rows={4}
              label="Text to print"
              variant="outlined"
              helperText={formErrors?.textToPrint?.message}
              error={Boolean(formErrors?.textToPrint)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
        <Button disabled={!isAvailableToPrint} type="submit">
          Print
        </Button>
      </Box>
    </Box>
  );
};
