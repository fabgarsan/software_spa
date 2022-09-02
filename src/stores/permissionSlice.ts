import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPermissionCurrentUser, Permission } from "@api/index";
import { RootState } from "@stores/store";
import { createNotification } from "@stores/notificationSlice";

import { trackPromise } from "react-promise-tracker";

export type SliceState = {
  permissions: Permission[];
};

const initialState: SliceState = {
  permissions: [],
};

export const fetchPermissionCurrentUserThunk = createAsyncThunk(
  "permission/fetchPermissionCurrentUser",
  async (_, thunkApi) => {
    try {
      const { data } = await trackPromise(fetchPermissionCurrentUser());
      thunkApi.dispatch(
        createNotification({
          message: `Permisos de usuario cargados`,
          severity: "success",
          time: 5000,
        })
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const permissionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearPermissions: (state): void => {
      state.permissions = [];
    },
    loadPermissionsFromStorage: (state): void => {
      const storedPermissions = localStorage.getItem("permissions");
      state.permissions = storedPermissions
        ? JSON.parse(storedPermissions)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPermissionCurrentUserThunk.fulfilled,
      (state, { payload }) => {
        const serialPermissions = JSON.stringify(payload);
        localStorage.setItem("permissions", serialPermissions);
        state.permissions = payload;
      }
    );
  },
});
export const { clearPermissions, loadPermissionsFromStorage } =
  permissionSlice.actions;
export const permissions = (state: RootState): SliceState => state.permission;

export default permissionSlice;
