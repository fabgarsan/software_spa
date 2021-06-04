import {createSlice} from '@reduxjs/toolkit';
import omit from 'lodash.omit';
import {RootState} from "@stores/store";
import {Color} from "@material-ui/lab";

export type Notification = {
  message: string,
  time: number,
  severity: Color
}

export type SliceState = {
  [name: string]: Notification
}

const initialState: SliceState = {}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    createNotification: (state, {payload}) => ({
      ...state,
      [payload.message]: {
        message: payload.message,
        severity: payload.severity,
        time: payload?.time | 5000
      }
    }),
    removeNotification: (state, {payload}) => omit({...state}, payload)
  }
});

export const getNotifications = (state: RootState) => state.notification;
export const {
  createNotification,
  removeNotification
} = notificationSlice.actions;
export default notificationSlice;
