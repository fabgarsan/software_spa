import React, { useEffect, useState } from "react";
import {
  TextField,
  DialogActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { BloodType, Escort, EscortCategory, GenderType } from "@dto/index";
import {
  IDScanner,
  AutocompleteCities,
  DialogCreateEditBase,
  ExtendedUserCRUDDialogCreateEdit,
} from "@components/shared";
import {
  DIALOG_MESSAGES,
  UI,
  FORM_FIELDS,
  setFormError,
  setFormValue,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useCRUDGenericApiCall } from "@hooks/index";
import useValidation from "./EscortCRUDDialogCreateEdit.hooks";

const { escort, escortCategory } = InstancesDescriptorKeys;

const instanceDescriptorEscort = instancesDescriptor[escort];
const instanceDescriptorEscortCategory = instancesDescriptor[escortCategory];

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

export const EscortCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<Escort>
> = ({ open, handleClose, onSave, instance }: CRUDDefaultFormProps<Escort>) => {
  const resolver = useValidation();
  const classes = useStyles();
  const { fetchAllPagination } = useCRUDGenericApiCall<EscortCategory>(
    instanceDescriptorEscortCategory.apiRoute || ""
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
    (async () => {
      const response = await fetchAllPagination(10, 0, {});
      setCategories(response.results);
    })();
  }, [fetchAllPagination]);

  useEffect(() => {
    if (instance) {
      setFormValue<Escort>(setValue, instance);
    }
  }, [instance, setValue]);

  const handleOnBlur = (
    dateOfBirth: Date,
    bloodType: BloodType,
    firstName: string,
    lastName: string,
    idNumber: string,
    gender: GenderType,
    idType: string
  ) => {
    setValue("dateOfBirth", dateOfBirth);
    setValue("idNumber", idNumber);
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("idType", idType);
    setValue("bloodType", bloodType);
  };

  return (
    <DialogCreateEditBase
      open={open}
      title={DIALOG_MESSAGES.CRUD_CREATE_EDIT_DIALOG_TITLE(
        instanceDescriptorEscort.singular,
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
              userType: "A",
              alias: data.alias.toUpperCase(),
              firstName: data.firstName.toUpperCase(),
              lastName: data.lastName.toUpperCase(),
            });
          } catch (errors) {
            setFormError<Escort>(setError, errors);
          }
        })}
      >
        <IDScanner onBlur={handleOnBlur}>
          <Grid container>
            <ExtendedUserCRUDDialogCreateEdit
              showGender={false}
              formErrors={formErrors}
              // @ts-ignore
              control={control}
            />
            <Grid item xs={12} sm={5} md={3} lg={3}>
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
            <Grid item xs={12} sm={3} md={2} lg={2}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-category-select">
                      {FORM_FIELDS.ESCORT.LABEL_CATEGORY}
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
            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                render={() => (
                  <AutocompleteCities
                    initialValue={
                      instance &&
                      instance.city &&
                      instance.cityName &&
                      instance.departmentName &&
                      instance.countryName
                        ? {
                            name: `${instance.cityName} - ${instance.departmentName} - ${instance.countryName}`,
                            id: instance.city,
                          }
                        : undefined
                    }
                    onChange={(city) => setValue("city", city)}
                  />
                )}
              />
              {formErrors?.city && (
                <FormHelperText className={classes.error}>
                  {formErrors.city.message}
                </FormHelperText>
              )}
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
        </IDScanner>
      </Box>
    </DialogCreateEditBase>
  );
};
