import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  DialogActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { EscortCategoryRate } from "@dto/escorts";
import { DialogCreateEditBase } from "@components/shared";
import { useCategoriesQuery } from "./EscortCategoryRateCRUDDialogCreateEdit.hooks";
import { QueryErrorBoundary } from "@components/shared";

import {
  DIALOG_MESSAGES,
  UI,
  FORM_FIELDS,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/withCRUDReactQuery";
import useDialogCreateEditCRUDEscortCategoryValidation from "./EscortCategoryRateCRUDDialogCreateEdit.hooks";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { GetEscortCategoryRate } from "@api/escort";

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

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

export const EscortCategoryRateCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<GetEscortCategoryRate, EscortCategoryRate>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useDialogCreateEditCRUDEscortCategoryValidation();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<EscortCategoryRate>({ resolver });

  const categoriesQuery = useCategoriesQuery();
  const { data: categoriesData } = categoriesQuery;

  useEffect(() => {
    if (instance) {
      setFormValue<EscortCategoryRate>(setValue, instance, [
        "value",
        "category",
        "minutes",
        "publishedWeb",
      ]);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<EscortCategoryRate>(setError, mutationErrors);
  }, [setError, mutationErrors]);

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptor.singular,
        Boolean(instance)
      )}
      nonFieldErrors={mutationErrors?.nonFieldErrors}
    >
      <QueryErrorBoundary queries={[categoriesQuery]}>
        <Box component="form" onSubmit={handleSubmit(onSave)}>
          <Grid container>
            <Grid item xs={12}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-category-select">
                      {FORM_FIELDS.ESCORT_CATEGORIES_RATES.LABEL_CATEGORY}
                    </InputLabel>
                    <Select
                      fullWidth
                      native
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{
                        id: "id-category-select",
                      }}
                    >
                      <option value={undefined}>-----</option>
                      {categoriesData?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                    {formErrors?.category && (
                      <FormHelperText className={classes.error}>
                        {formErrors.category.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="minutes"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.ESCORT_CATEGORIES_RATES.LABEL_MINUTES}
                    variant="outlined"
                    helperText={formErrors?.minutes?.message}
                    error={Boolean(formErrors?.minutes)}
                    autoComplete="off"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="value"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={FORM_FIELDS.ESCORT_CATEGORIES_RATES.LABEL_VALUE}
                    variant="outlined"
                    helperText={formErrors?.minutes?.message}
                    error={Boolean(formErrors?.minutes)}
                    autoComplete="off"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="publishedWeb"
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
                label={FORM_FIELDS.ESCORT_CATEGORIES_RATES.LABEL_PUBLISHED_WEB}
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
      </QueryErrorBoundary>
    </DialogCreateEditBase>
  );
};
