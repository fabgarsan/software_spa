import { configureStore, Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "@stores/authSlice";
import notificationSlice from "@stores/notificationSlice";
import drawerSlice from "@stores/drawerSlices";
import permissionSlice from "@stores/./permissionSlice";

import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    drawer: drawerSlice.reducer,
    permission: permissionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>();
export default store;
