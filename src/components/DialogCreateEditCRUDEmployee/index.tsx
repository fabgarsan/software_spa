import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { DialogActions, Box, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ExtendedUser } from "@dbTypes/index";
import {
  DialogCreateEditBase,
  DialogCreateEditCRUDFormExtendedUser,
} from "@components/index";
import {
  DIALOG_MESSAGES,
  INSTANCES_NAMES,
  UI,
  setFormError,
  setFormValue,
} from "@utils/index";

import { CRUDDefaultFormProps } from "@hoc/index";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useValidation from "./DialogCreateEditCRUDEmployee.hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        padding: theme.spacing(1),
      },
    },
  })
);

const DialogCreateEditEscort: React.FunctionComponent<
  CRUDDefaultFormProps<ExtendedUser>
> = ({
  open,
  handleClose,
  onSave,
  instance,
}: CRUDDefaultFormProps<ExtendedUser>) => {
  const resolver = useValidation();
  const classes = useStyles();
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
              userType: "T",
              firstName: data.firstName.toUpperCase(),
              lastName: data.lastName.toUpperCase(),
            });
          } catch (errors) {
            setFormError<ExtendedUser>(setError, errors);
          }
        })}
      >
        <Grid container className={classes.root}>
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
      </Box>
    </DialogCreateEditBase>
  );
};

export default DialogCreateEditEscort;
