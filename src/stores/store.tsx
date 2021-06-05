import {
  configureStore,
  Dispatch,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "@stores/authSlice";
import notificationSlice from "@stores/notificationSlice";
import drawerSlice from "@stores/drawerSlices";

import logger from "redux-logger";

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    drawer: drawerSlice.reducer,
  },
  middleware,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>();
export default store;
