import React from "react";
import "./App.css";
import { useAuth } from "@hooks/index";
import { Box, Typography } from "@material-ui/core";
import { SignInForm, Notify } from "@components/index";
import { MainRouter } from "@containers/index";
import loadIcons from "@theme/loadIcons";

loadIcons();

const App: React.FunctionComponent = () => {
  const { auth, logIn } = useAuth();
  if (auth.loading) {
    return (
      <Box mt={5} m="auto" textAlign="center">
        <Typography color="textSecondary" variant="h5" paragraph>
          Loading...
        </Typography>
      </Box>
    );
  }
  if (!auth.isAuthenticated) {
    return <SignInForm logIn={logIn} errors={auth.error} />;
  }
  return (
    <>
      <Notify />
      <MainRouter />
    </>
  );
};

export default App;
