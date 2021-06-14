import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  TextField,
  DialogActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { Escort, EscortCategory } from "@dbTypes/escorts";
import { DialogCreateEditBase } from "@components/index";
import {
  DIALOG_MESSAGES,
  INSTANCES_NAMES,
  UI,
  FORM_FIELDS,
  API_ROUTES,
  setIfNotString,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useCRUDGenericApiCall } from "@hooks/index";
import useValidation from "./DialogCreateEditCRUDEscort.hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        padding: theme.spacing(1),
      },
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

const DialogCreateEditEscort: React.FunctionComponent<
  CRUDDefaultFormProps<Escort>
> = ({ open, handleClose, onSave, instance }: CRUDDefaultFormProps<Escort>) => {
  const resolver = useValidation();
  const classes = useStyles();
  const { fetchAllPagination } = useCRUDGenericApiCall<EscortCategory>(
    API_ROUTES.ESCORT_CATEGORY
  );
  const [categories, setCategories] = useState<EscortCategory[]>();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<Escort>({ resolver });

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchAllPagination(10, 0, {});
      setCategories(response.results);
    };
    getCategories();
  }, [fetchAllPagination]);

  useEffect(() => {
    if (instance) {
      Object.entries(instance).forEach(([key, value]) => {
        setValue(key as keyof Escort, value);
      });
    }
  }, [instance, setValue]);
  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        INSTANCES_NAMES.ESCORT_SINGULAR,
        Boolean(instance)
      )}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          try {
            await onSave({
              ...data,
              gender: "F",
              password: `Cc${data.idNumber}`,
              userType: "A",
              alias: data.alias.toUpperCase(),
              firstName: data.firstName.toUpperCase(),
              lastName: data.lastName.toUpperCase(),
              email: data.email.toUpperCase(),
            });
          } catch (errors) {
            Object.entries(errors).forEach(([key, value]) => {
              setError(key as keyof Escort, {
                type: "manual",
                message: setIfNotString(value),
              });
            });
          }
        })}
      >
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.USER.LABEL_FIRST_NAME}
                  variant="outlined"
                  helperText={formErrors?.firstName?.message}
                  error={Boolean(formErrors?.firstName)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.USER.LABEL_LAST_NAME}
                  variant="outlined"
                  helperText={formErrors?.lastName?.message}
                  error={Boolean(formErrors?.lastName)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              name="alias"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ESCORT.LABEL_ALIAS}
                  variant="outlined"
                  helperText={formErrors?.alias?.message}
                  error={Boolean(formErrors?.alias)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.USER.LABEL_EMAIL}
                  variant="outlined"
                  helperText={formErrors?.email?.message}
                  error={Boolean(formErrors?.email)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="idType"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-type-select">
                    {FORM_FIELDS.USER.LABEL_ID_TYPE}
                  </InputLabel>
                  <Select
                    native
                    fullWidth
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      id: "id-type-select",
                    }}
                  >
                    <option value={undefined}>-----</option>
                    <option
                      value={FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.CC.TYPE}
                    >
                      {FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.CC.TEXT}
                    </option>
                    <option
                      value={FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.CE.TYPE}
                    >
                      {FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.CE.TEXT}
                    </option>
                    <option
                      value={FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.PS.TYPE}
                    >
                      {FORM_FIELDS.USER.LABEL_ID_TYPE_OPTIONS.PS.TEXT}
                    </option>
                  </Select>
                  {formErrors?.idType && (
                    <FormHelperText className={classes.error}>
                      {formErrors.idType.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="idNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.USER.LABEL_ID_NUMBER}
                  variant="outlined"
                  helperText={formErrors?.idNumber?.message}
                  error={Boolean(formErrors?.idNumber)}
                  autoComplete="off"
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-category-select">
                    {FORM_FIELDS.USER.LABEL_CATEGORY}
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
                    {categories?.map((category) => (
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

export default DialogCreateEditEscort;
