import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import useFormSignInValidation from "./FormSignIn.validation";

type FormValues = {
  username: string;
  password: string;
};

interface FormSignInProps {
  logIn: (username: string, password: string) => void;
  errors: { [errorName: string]: string } | null;
}

const FormSignIn: React.FunctionComponent<FormSignInProps> = ({
  logIn,
  errors,
}: FormSignInProps) => {
  const resolver = useFormSignInValidation();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>({ resolver });
  return (
    <Box m={6}>
      <Box color="info.main" mt={5}>
        <Box
          m="auto"
          maxWidth={400}
          component="form"
          onSubmit={handleSubmit((data) => logIn(data.username, data.password))}
        >
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="h5" paragraph>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("username")}
                fullWidth
                label="Nombre Usuario"
                variant="outlined"
                autoComplete="off"
                helperText={formErrors?.username?.message}
                error={Boolean(formErrors?.username)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("password")}
                label="Contraseña"
                variant="outlined"
                type="password"
                autoComplete="off"
                helperText={formErrors?.password?.message}
                error={Boolean(formErrors?.password)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" width="100%" justifyContent="space-between">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Acceder
                </Button>
              </Box>
            </Grid>
            {errors?.non_field_errors && (
              <Grid item xs={12}>
                <Typography
                  align="center"
                  color="error"
                  paragraph
                  variant="body1"
                >
                  {errors.non_field_errors}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FormSignIn;
