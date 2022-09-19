import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DialogActions, Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DialogCreateEditBase } from "@components/shared";
import { UI, setFormError } from "@utils/index";
import { formatIntoMoney } from "@utils/functions";

import {
  useOpenPointOfSaleWorkShiftMutation,
  useValidation,
} from "./OpenPointOfSaleModal.hooks";
import { PointOfSale } from "@dto/pointOfSale";
import { OpenPointOfSaleWorkShiftRequest } from "@api/pointOfSale";
import { usePointOfSaleAccessQuery } from "@api/pointOfSale";

export interface OpenPointOfSaleModalProps {
  handleClose: () => void;
  open: boolean;
  instance: PointOfSale;
}

export const OpenPointOfSaleModal: React.FunctionComponent<
  OpenPointOfSaleModalProps
> = ({ open, handleClose, instance }) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setError,
  } = useForm<OpenPointOfSaleWorkShiftRequest>({ resolver });

  const { refetch } = usePointOfSaleAccessQuery();

  const { mutate: openPointOfSaleWorkShiftMutation, error: mutationErrors } =
    useOpenPointOfSaleWorkShiftMutation({
      pointOfSale: instance.id,
      onSuccessCallBack: () => {
        refetch();
        handleClose();
      },
    });

  useEffect(() => {
    setFormError<OpenPointOfSaleWorkShiftRequest>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={`Abrir punto de venta ${instance.name}`}
      // @ts-ignore
      nonFieldErrors={mutationErrors?.nonFieldErrors}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          openPointOfSaleWorkShiftMutation(data.initialCash)
        )}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="initialCash"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Dinero Inicial"
                  variant="outlined"
                  helperText={
                    formErrors?.initialCash?.message ||
                    formatIntoMoney(field.value)
                  }
                  error={Boolean(formErrors?.initialCash)}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {UI.BUTTON_TEXT_CANCEL}
          </Button>
          <Button color="secondary" type="submit">
            {UI.BUTTON_TEXT_SAVE}
          </Button>
        </DialogActions>
      </Box>
    </DialogCreateEditBase>
  );
};
