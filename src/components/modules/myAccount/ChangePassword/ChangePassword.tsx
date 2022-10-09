import React, { useEffect, useState } from "react";
import {
  useCreateParkingServiceMutation,
  useValidation,
} from "@components/modules/myAccount/ChangePassword/ChangePassword.hooks";
import { Controller, useForm } from "react-hook-form";
import { ChangePasswordCurrentUserRequest } from "@api/user";
import { setFormError } from "@utils/functions";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { UI } from "@utils/constantsUI";

export const ChangePassword = () => {
  const resolver = useValidation();
  const [clearPassword, setClearPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setError,
    reset,
  } = useForm<ChangePasswordCurrentUserRequest>({ resolver });
  const { mutate: changePasswordMutation, error: mutationErrors } =
    useCreateParkingServiceMutation({
      onSuccessCallBack: () => {
        reset();
      },
    });

  useEffect(() => {
    setFormError<ChangePasswordCurrentUserRequest>(
      setError,
      mutationErrors?.response?.data
    );
  }, [setError, mutationErrors]);

  return (
    <>
      <Typography variant="h6" color="primary">
        Cambiar Contraseña{" "}
        <FontAwesomeIcon
          onClick={() => setClearPassword(!clearPassword)}
          icon={["fal", (clearPassword && "eye-slash") || "eye"]}
          size="xs"
        />
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          changePasswordMutation(data);
        })}
      >
        <Box mt={1}>
          <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={(clearPassword && "text") || "password"}
                fullWidth
                label="Actual Contraseña"
                variant="outlined"
                helperText={formErrors?.oldPassword?.message}
                error={Boolean(formErrors?.oldPassword)}
                autoComplete="off"
                value={field.value}
              />
            )}
          />
        </Box>
        <Box mt={1}>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={(clearPassword && "text") || "password"}
                fullWidth
                label="Nueva Contraseña"
                variant="outlined"
                helperText={formErrors?.newPassword?.message}
                error={Boolean(formErrors?.newPassword)}
                autoComplete="off"
                value={field.value}
              />
            )}
          />
        </Box>
        <Box mt={1}>
          <Controller
            name="newPasswordConfirmation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={(clearPassword && "text") || "password"}
                fullWidth
                label="Nueva Contraseña Confirmación"
                variant="outlined"
                helperText={formErrors?.newPasswordConfirmation?.message}
                error={Boolean(formErrors?.newPasswordConfirmation)}
                autoComplete="off"
                value={field.value}
              />
            )}
          />
        </Box>
        <Box mt={1}>
          {Array.isArray(mutationErrors?.response?.data.nonFieldErrors) && (
            <Box>
              <Grid item xs={12}>
                {mutationErrors?.response?.data.nonFieldErrors.map(
                  (nonFieldError) => (
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
                  )
                )}
              </Grid>
            </Box>
          )}
        </Box>
        <Box mt={1} textAlign="right">
          <Button color="secondary" type="submit" variant="contained">
            {UI.BUTTON_TEXT_SAVE}
          </Button>
        </Box>
      </Box>
    </>
  );
};
