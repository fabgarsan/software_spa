// https://github.com/rubenruvalcabac/epson-epos-sdk-react
// https://c4b.epson-biz.com/modules/community/index.php?content_id=91
import React, { useRef, useState } from "react";
import { useValidation } from "@components/labs/ThermalPrinter/ThermalPrinter.hooks";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export const ThermalPrinter = () => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<{
    printerPort: number;
    printerIPAddress: string;
    textToPrint: string;
  }>({ resolver });
  const [connectionStatus, setConnectionStatus] = useState("");

  const ePosDevice = useRef();
  const printer = useRef();

  const STATUS_CONNECTED = "Connected";

  const connect = ({
    printerIPAddress,
    printerPort,
  }: {
    printerIPAddress: string;
    printerPort: number;
  }) => {
    setConnectionStatus("Connecting ...");

    if (!printerIPAddress) {
      setConnectionStatus("Type the printer IP address");
      return;
    }
    if (!printerPort) {
      setConnectionStatus("Type the printer port");
      return;
    }

    setConnectionStatus("Connecting ...");

    // @ts-ignore
    const ePosDev = new window.epson.ePOSDevice();
    ePosDevice.current = ePosDev;

    // @ts-ignore
    ePosDev.connect(printerIPAddress, printerPort, (data) => {
      if (data === "OK") {
        ePosDev.createDevice(
          "local_printer",
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: true, buffer: false },
          // @ts-ignore
          (devobj, retcode) => {
            if (retcode === "OK") {
              printer.current = devobj;
              setConnectionStatus(STATUS_CONNECTED);
            } else {
              throw retcode;
            }
          }
        );
      } else {
        throw data;
      }
    });
  };

  const print = (text: string) => {
    const prn = printer.current;
    if (!prn) {
      alert("Not connected to printer");
      return;
    }

    // @ts-ignore
    prn.addText(text);
    // @ts-ignore
    prn.addFeedLine(5);
    // @ts-ignore
    prn.addCut(prn.CUT_FEED);

    // @ts-ignore
    prn.send();
  };

  return (
    <Box>
      <Typography variant="h6">{connectionStatus}</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          connect(data);
          console.log("Desactivado por ahora", data);
          if (connectionStatus === STATUS_CONNECTED) {
            print(data.textToPrint);
          }
        })}
      >
        <Controller
          name="printerPort"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Printer Port"
              variant="outlined"
              helperText={formErrors?.printerPort?.message}
              error={Boolean(formErrors?.printerPort)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />{" "}
        <Controller
          name="printerIPAddress"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Printer Ip Address"
              variant="outlined"
              helperText={formErrors?.printerIPAddress?.message}
              error={Boolean(formErrors?.printerIPAddress)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
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
              helperText={formErrors?.printerIPAddress?.message}
              error={Boolean(formErrors?.printerIPAddress)}
              autoComplete="off"
              value={field.value}
            />
          )}
        />
        <Button type="submit">Print</Button>
      </Box>
    </Box>
  );
};
