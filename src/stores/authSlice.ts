import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthCredential,
  AuthUser,
  loadUser,
  Login,
  logIn,
  logOut,
} from "@api/authentication";
import { RootState } from "@stores/store";
import { createNotification } from "@stores/notificationSlice";
import { mainAxiosClientManager } from "@clients/index";

import { trackPromise } from "react-promise-tracker";

// Screen -> hook -> action -> service -> provider
// Screen -> HTML
// hook -> Logica ( useDispatch  ,useSelector())
// action -> redux
// services -> Track
// provider -> api

export type SliceState = {
  user: AuthUser | null;
  loading: boolean;
  error: { [errorName: string]: string } | null;
  isAuthenticated: boolean;
};

const initialState: SliceState = {
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

export const logInThunk = createAsyncThunk<Login, AuthCredential>(
  "auth/logIn",
  async ({ username, password }, thunkApi) => {
    try {
      const { data } = await trackPromise(logIn({ username, password }));
      thunkApi.dispatch(
        createNotification({
          message: `Bienvenido ${data?.user?.username || ""}`,
          severity: "success",
          time: 10000,
        })
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const logOutThunk = createAsyncThunk<null>("auth/logOut", async () => {
  const { data } = await trackPromise(logOut());
  return data;
});

export const loadUserThunk = createAsyncThunk<AuthUser>(
  "auth/current/",
  async () => {
    const { data } = await trackPromise(loadUser());
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsNotAuthenticated: (state): void => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loadUserThunk.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(logOutThunk.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loadUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    });
    builder.addCase(logInThunk.fulfilled, (state, { payload }) => {
      const { token } = payload;
      state.user = payload.user;
      state.isAuthenticated = true;
      state.error = null;
      mainAxiosClientManager.addToken(token);
    });
    builder.addCase(logOutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      mainAxiosClientManager.removeToken();
    });
    builder.addCase(logOutThunk.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      mainAxiosClientManager.removeToken();
    });
    builder.addCase(loadUserThunk.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});
export const { setIsNotAuthenticated } = authSlice.actions;
export const auth = (state: RootState): SliceState => state.auth;

export default authSlice;
