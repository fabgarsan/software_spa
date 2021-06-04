import React from 'react';
import './App.css';
import {useAuth} from "./hooks/useAuth";
import SignInForm from "./components/SignInForm";
import MainRouter from "./containers/MainRouter";

function App() {
  const {auth, logOut, logIn} = useAuth();
  if (!auth.isAuthenticated) {
    return <SignInForm logIn={logIn} errors={auth.error}/>
  }
  return (
    <div>
      <MainRouter/>
      <div>
        {auth.isAuthenticated && <button onClick={() => logOut()}>LogOut</button>}
      </div>
    </div>
  );
}

export default App;
