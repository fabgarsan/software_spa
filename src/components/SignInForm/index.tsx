import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, Grid, TextField, Typography} from "@material-ui/core";

type FormValues = {
  username: string;
  password: string;
};

interface SignInFormProps {
  logIn: (username: string, password: string) => void,
  errors: { [errorName: string]: string } | null
}

const SignInForm = ({logIn, errors}: SignInFormProps) => {
  const {register, handleSubmit} = useForm<FormValues>();
  return <Box m={6}>
    <Box color="info.main" mt={5}>
      <Box
        m="auto"
        maxWidth={400}
        component="form"
        onSubmit={handleSubmit((data) => logIn(data.username, data.password))}
      >
        <Grid container spacing={3} justify="flex-end">
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              {...register("password")}
              label="Contraseña"
              variant="outlined"
              type="password"
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
          {errors?.non_field_errors && <Grid item xs={12}>
            <Typography
              align="center"
              color="error"
              paragraph
              variant="body1"
            >
              {errors.non_field_errors}
            </Typography>
          </Grid>}
        </Grid>
      </Box>
    </Box>
  </Box>
}

export default SignInForm;