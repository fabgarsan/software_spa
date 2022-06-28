import { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "@stores/store";

import {
  logInThunk,
  logOutThunk,
  loadUserThunk,
  setIsNotAuthenticated as setIsNotAuthenticatedAction,
  auth as authInfo,
} from "@stores/authSlice";

import {
  fetchPermissionCurrentUserThunk,
  loadPermissionsFromStorage,
} from "@stores/permissionSlice";

const useAuth = () => {
  const logIn = (username: string, password: string) => {
    store.dispatch(logInThunk({ username, password }));
  };

  const logOut = () => {
    store.dispatch(logOutThunk());
  };

  const setIsNotAuthenticated = () => {
    store.dispatch(setIsNotAuthenticatedAction());
  };

  const auth = useSelector(authInfo);
  useEffect(() => {
    store.dispatch(loadUserThunk());
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (localStorage.getItem("permissions")) {
        store.dispatch(loadPermissionsFromStorage());
      } else {
        store.dispatch(fetchPermissionCurrentUserThunk());
      }
    }
  }, [auth.isAuthenticated]);

  return {
    auth,
    logIn,
    logOut,
    setIsNotAuthenticated,
  };
};

export default useAuth;
