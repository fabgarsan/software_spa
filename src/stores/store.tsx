import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import authSlice from "./authSlice";

import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store;
