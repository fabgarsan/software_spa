import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadUser, logIn, logOut} from "../api/authentication";
import {RootState} from "./store";
import axios from "axios";

type AuthUser = {
  id: number | null,
  username: string | null
}

export type SliceState = {
  user: AuthUser | null,
  loading: boolean,
  error: { [errorName: string]: string } | null,
  isAuthenticated: boolean
}

const initialState: SliceState = {
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false
}

type singInParams = {
  password: string,
  username: string
}

export const logInThunk = createAsyncThunk<{ token: string, user: AuthUser }, singInParams>(
  'auth/logIn',
  async ({username, password}, thunkApi) => {
    try {
      const response = await logIn(username, password)
      return (await response.data)
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.detail)
    }
  }
)

export const logOutThunk = createAsyncThunk<any>(
  'auth/logOut',
  async () => {
    const response = await logOut()
    return (await response.data)
  }
)

export const loadUserThunk = createAsyncThunk<AuthUser>(
  'auth/current/',
  async () => {
    const response = await loadUser()
    return (await response.data)
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, state => {
      state.loading = true
      state.isAuthenticated = false
    })
    builder.addCase(loadUserThunk.pending, state => {
      state.loading = true
      state.isAuthenticated = false
    })
    builder.addCase(logOutThunk.pending, state => {
      state.loading = true
      state.isAuthenticated = false
    })
    builder.addCase(loadUserThunk.fulfilled, (state, {payload}) => {
      state.user = payload;
      state.loading = false
      state.isAuthenticated = true
    })
    builder.addCase(logInThunk.fulfilled, (state, {payload}) => {
      const token = payload.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common = {
        "Authorization": `Token ${token}`,
      };
      state.user = payload.user
      state.loading = false
      state.isAuthenticated = true
      state.error = null
    })
    builder.addCase(logOutThunk.fulfilled, (state, action) => {
      state.user = null;
      state.loading = false
      state.isAuthenticated = false
      localStorage.removeItem('token');
      delete axios.defaults.headers.common["Authorization"];
    })
    builder.addCase(logOutThunk.rejected, state => {
      state.user = null;
      state.loading = false
      state.isAuthenticated = false
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    })
    builder.addCase(logInThunk.rejected, (state, {payload}) => {
      if (typeof payload === 'string') {
        state.error = {'non_field_errors': payload}
      }
      state.loading = false
    })
    builder.addCase(loadUserThunk.rejected, state => {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
      state.user = null;
      state.loading = false
      state.isAuthenticated = false
    })
  }
});

export const auth = (state: RootState) => state.auth;
export default authSlice;
