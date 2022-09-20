import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  DialogActions,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DialogCreateEditBase } from "@components/shared";
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
import useDialogCreateEditCRUDValidation, {
  useCompaniesQuery,
  useRoomTypesQuery,
} from "./RoomCRUDDialogCreateEdit.hooks";
import { Room } from "@dto/room";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { GetRoomApiResponse } from "@api/room";

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.room];

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

export const RoomCRUDDialogCreateEdit: React.FunctionComponent<
  CRUDDefaultFormProps<GetRoomApiResponse, Room>
> = ({ open, error: mutationErrors, handleClose, onSave, instance }) => {
  const resolver = useDialogCreateEditCRUDValidation();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<Room>({ resolver });

  const classes = useStyles();

  const roomTypesQuery = useRoomTypesQuery();
  const { data: roomTypesData } = roomTypesQuery;

  const companiesQuery = useCompaniesQuery();
  const { data: companiesData } = companiesQuery;

  useEffect(() => {
    if (instance) {
      setFormValue<Room>(setValue, instance, [
        "roomType",
        "company",
        "number",
        "isActive",
      ]);
    }
  }, [instance, setValue]);

  useEffect(() => {
    setFormError<Room>(setError, mutationErrors);
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
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="number"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={FORM_FIELDS.ROOM.LABEL_NUMBER}
                  variant="outlined"
                  helperText={formErrors?.number?.message}
                  error={Boolean(formErrors?.number)}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="roomType"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-category-select">
                    {FORM_FIELDS.ROOM.LABEL_ROOM_TYPE}
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
                    {roomTypesData?.map((roomType) => (
                      <option key={roomType.id} value={roomType.id}>
                        {roomType.name}
                      </option>
                    ))}
                  </Select>
                  {formErrors?.roomType && (
                    <FormHelperText className={classes.error}>
                      {formErrors.roomType.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-category-select">
                    {FORM_FIELDS.ROOM.LABEL_COMPANY}
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
                    {companiesData?.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </Select>
                  {formErrors?.company && (
                    <FormHelperText className={classes.error}>
                      {formErrors.company.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="isActive"
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
              label={FORM_FIELDS.ROOM.LABEL_IS_ACTIVE}
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
