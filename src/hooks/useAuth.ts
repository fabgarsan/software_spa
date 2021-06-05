import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logInThunk,
  logOutThunk,
  loadUserThunk,
  auth as authInfo,
} from "@stores/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (username: string, password: string) => {
    return dispatch(logInThunk({ username, password }));
  };

  const logOut = () => {
    return dispatch(logOutThunk());
  };
  const auth = useSelector(authInfo);
  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  return {
    auth,
    logIn,
    logOut,
  };
};

export default useAuth;
