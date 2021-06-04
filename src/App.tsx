import React from 'react';
import './App.css';
import {useAuth} from "./hooks/useAuth";
import SignInForm from "./components/SignInForm";
import MainRouter from "./containers/MainRouter";
import Notify from "./components/Notify";
import {Box, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import loadIcons from "./theme/loadIcons";
loadIcons();

function App() {
  const {auth, logOut, logIn} = useAuth();
  if (auth.loading) {
    return (
      <Box mt={5} m="auto" textAlign='center'>
        <Typography color="textSecondary" variant="h5" paragraph>
          Loading...
        </Typography>
      </Box>
    )
  }
  if (!auth.isAuthenticated) {
    return <SignInForm logIn={logIn} errors={auth.error}/>
  }
  return (
    <div>
      <FontAwesomeIcon icon={["fal", "coffee"]} size={"10x"} spin />
      <Notify/>
      <MainRouter/>
      <div>
        {auth.isAuthenticated && <button onClick={() => logOut()}>LogOut</button>}
      </div>
    </div>
  );
}

export default App;
