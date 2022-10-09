import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PointOfSale } from "@dto/pointOfSale";
import { DialogCreateEditBase, QueryErrorBoundary } from "@components/shared";
import {
  DIALOG_MESSAGES,
  FORM_FIELDS,
  instancesDescriptor,
  InstancesDescriptorKeys,
  setFormError,
  setFormValue,
  UI,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import { usePrintersQuery, useValidation } from "./DialogCreateEdit.hooks";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

export const DialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<PointOfSale>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<PointOfSale>({ resolver });

  const printersQuery = usePrintersQuery();
  const { data: printersDataQuery } = printersQuery;

  useEffect(() => {
    if (instance) {
      setFormValue<PointOfSale>(setValue, instance);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<PointOfSale>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.plural,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors?.nonFieldErrors}
    >
      <QueryErrorBoundary queries={[printersQuery]}>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            onSave({
              ...data,
              name: data.name.toUpperCase(),
            });
          })}
        >
          <Grid container>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.POINT_OF_SALE.LABEL_NAME}
                    variant="outlined"
                    helperText={formErrors?.name?.message}
                    error={Boolean(formErrors?.name)}
                    autoComplete="off"
                    value={field.value?.toUpperCase()}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="printer"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-printer-select">
                      {FORM_FIELDS.POINT_OF_SALE.LABEL_PRINTER}
                    </InputLabel>
                    <Select
                      fullWidth
                      native
                      value={field.value || undefined}
                      onChange={field.onChange}
                      inputProps={{
                        id: "id-printer-select",
                      }}
                    >
                      <option value={undefined}>-----</option>
                      {printersDataQuery?.map((printer) => (
                        <option key={printer.id} value={printer.id}>
                          {printer.name}
                        </option>
                      ))}
                    </Select>
                    {formErrors?.printer && (
                      <FormHelperText className={classes.error}>
                        {formErrors.printer.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2} lg={2}>
              <FormControlLabel
                control={
                  <Controller
                    name="active"
                    defaultValue
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label={FORM_FIELDS.POINT_OF_SALE.LABEL_IS_ACTIVE}
              />
            </Grid>{" "}
            <Grid container item xs={12}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name="hasIncomeOperations"
                      defaultValue
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={FORM_FIELDS.POINT_OF_SALE.LABEL_HAS_INCOME_OPERATIONS}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name="hasOutcomesOperations"
                      defaultValue
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={FORM_FIELDS.POINT_OF_SALE.LABEL_HAS_OUTCOME_OPERATIONS}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name="hasParkingLotServicesSales"
                      defaultValue
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={FORM_FIELDS.POINT_OF_SALE.LABEL_HAS_PARKING_LOT}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name="hasEscortServicesSales"
                      defaultValue
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={FORM_FIELDS.POINT_OF_SALE.LABEL_HAS_ESCORT_SERVICES}
                />
              </Grid>
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
      </QueryErrorBoundary>
    </DialogCreateEditBase>
  );
};
