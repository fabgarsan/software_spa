import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const logIn = (username: string, password: string) => {
    dispatch(logInThunk({ username, password }));
  };

  const logOut = () => {
    return dispatch(logOutThunk());
  };

  const setIsNotAuthenticated = () => {
    dispatch(setIsNotAuthenticatedAction());
  };

  const auth = useSelector(authInfo);
  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (localStorage.getItem("permissions")) {
        dispatch(loadPermissionsFromStorage());
      } else {
        dispatch(fetchPermissionCurrentUserThunk());
      }
    }
  }, [auth.isAuthenticated, dispatch]);

  return {
    auth,
    logIn,
    logOut,
    setIsNotAuthenticated,
  };
};

export default useAuth;
