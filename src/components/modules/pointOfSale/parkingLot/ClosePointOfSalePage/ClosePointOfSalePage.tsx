import React, { useEffect } from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
  ClosePointOfSaleWorkShiftRequest,
} from "@api/pointOfSale";
import { Box, Grid, TextField, Typography } from "@mui/material";
import {
  useClosePointOfSaleWorkShiftMutation,
  useValidation,
} from "@components/modules/pointOfSale/parkingLot/ClosePointOfSalePage/ClosePointOfSalePage.hooks";
import { Controller, useForm } from "react-hook-form";
import { formatIntoMoney, setFormError } from "@utils/functions";
import Button from "@mui/material/Button";
import { UI } from "@utils/constantsUI";

export const ClosePointOfSalePage: React.FunctionComponent = () => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setError,
  } = useForm<ClosePointOfSaleWorkShiftRequest>({ resolver });
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const {
    data: pointOfSaleAccessData,
    isSuccess,
    refetch,
  } = pointOfSaleAccessQuery;

  const openPointOfSale =
    (isSuccess && getPointOfSaleOpen(pointOfSaleAccessData)) || undefined;

  const { mutate: closePointOfSaleWorkShiftMutation, error: mutationErrors } =
    useClosePointOfSaleWorkShiftMutation({
      pointOfSaleWorkShiftId: pointOfSaleAccessData?.openWorkShift?.id || 0,
      onSuccessCallBack: () => refetch(),
    });

  useEffect(() => {
    setFormError<ClosePointOfSaleWorkShiftRequest>(
      setError,
      mutationErrors?.response?.data
    );
  }, [setError, mutationErrors]);

  if (!openPointOfSale) return <></>;
  const nonFieldErrors = mutationErrors?.response?.data?.nonFieldErrors;
  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Cerrar Punto de Venta {openPointOfSale.name}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(({ finalCash, finalCashUsd }) =>
          closePointOfSaleWorkShiftMutation({ finalCash, finalCashUsd })
        )}
      >
        <Grid container>
          <Grid container item xs={12} sm={6} md={4} lg={3}>
            <Grid item xs={12}>
              <Controller
                name="finalCash"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Dinero Final"
                    variant="outlined"
                    helperText={
                      formErrors?.finalCash?.message ||
                      formatIntoMoney(field.value)
                    }
                    error={Boolean(formErrors?.finalCash)}
                    value={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} paddingTop={2}>
              <Controller
                name="finalCashUsd"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Dinero Final Dolares"
                    variant="outlined"
                    helperText={
                      formErrors?.finalCashUsd?.message ||
                      formatIntoMoney(field.value, "USD")
                    }
                    error={Boolean(formErrors?.finalCashUsd)}
                    value={field.value}
                  />
                )}
              />
            </Grid>
            {nonFieldErrors && (
              <Grid item xs={12}>
                {nonFieldErrors.map((nonFieldError) => (
                  <Box key={nonFieldError}>
                    <Typography
                      align="center"
                      color="error"
                      paragraph
                      variant="body1"
                    >
                      {nonFieldError}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            )}
            <Grid item xs={12} textAlign="right">
              <Button color="secondary" type="submit">
                {UI.BUTTON_TEXT_SAVE}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
