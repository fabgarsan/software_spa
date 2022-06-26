import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash.omit";
import { RootState } from "@stores/store";
import { AlertColor } from "@mui/lab";

export type Notification = {
  message: string;
  time: number;
  severity: AlertColor;
};

export type SliceState = {
  [name: string]: Notification;
};

const initialState: SliceState = {};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification: (state, { payload }): SliceState => ({
      ...state,
      [payload.message]: {
        message: payload.message,
        severity: payload.severity,
        time: payload?.time || 5000,
      },
    }),
    removeNotification: (state, { payload }): SliceState =>
      omit({ ...state }, payload),
  },
});

export const getNotifications = (state: RootState): SliceState =>
  state.notification;
export const { createNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice;
