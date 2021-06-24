import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { DialogActions, Box, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { BloodType, ExtendedUser, GenderType } from "@dbTypes/index";
import {
  DialogCreateEditBase,
  DialogCreateEditCRUDFormExtendedUser,
  IDScanner,
} from "@components/index";
import {
  DIALOG_MESSAGES,
  INSTANCES_NAMES,
  UI,
  setFormError,
  setFormValue,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import useValidation from "./DialogCreateEditCRUDEmployee.hooks";

const DialogCreateEditEscort: React.FunctionComponent<
  CRUDDefaultFormProps<ExtendedUser>
> = ({
  open,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<ExtendedUser>) => {
  const resolver = useValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<ExtendedUser>({ resolver });

  useEffect(() => {
    if (instance) {
      setFormValue<ExtendedUser>(setValue, instance);
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
    setValue("gender", gender);
    setValue("idType", idType);
    setValue("bloodType", bloodType);
  };
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
              userType: "T",
              firstName: data.firstName.toUpperCase(),
              lastName: data.lastName.toUpperCase(),
            });
          } catch (errors) {
            setFormError<ExtendedUser>(setError, errors);
          }
        })}
      >
        <IDScanner onBlur={handleOnBlur}>
          <Grid container>
            <DialogCreateEditCRUDFormExtendedUser
              formErrors={formErrors}
              control={control}
            />
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

export default DialogCreateEditEscort;
