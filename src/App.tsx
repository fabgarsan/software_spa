import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useAuth} from "./hooks/useAuth";
import SignInForm from "./components/SignInForm";


function App() {
  const {auth, logOut, logIn} = useAuth();
  if (!auth.isAuthenticated) {
    return <SignInForm logIn={logIn} errors={auth.error}/>
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        {!auth.loading &&
        <div>
          {auth.isAuthenticated && <button onClick={() => logOut()}>LogOut</button>}
        </div>
        }
        <p>
          Edit <code>src/App.tsx</code> and save to reload. {process.env.REACT_APP_API_URL}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
