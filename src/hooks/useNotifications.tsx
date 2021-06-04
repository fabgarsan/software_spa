import React, {useMemo} from 'react';
import {Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AlertTimer from '../components/AlertTimer';
import {Color} from "@material-ui/lab";
import {
  createNotification,
  getNotifications,
  removeNotification
} from '../stores/notificationSlice';

const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);
  const showNotification = useMemo(
    () => Object.keys(notifications).length !== 0,
    [notifications]
  );

  const renderNotification = () => {
    return (
      showNotification &&
      Object.entries(notifications).map(([key, values]) => {
        return (
          <Box marginTop={2}
               key={key}>
            <AlertTimer
              severity={values.severity}
              time={values.time}
              onClose={() => dispatch(removeNotification(key))}
              message={values.message}
            />
          </Box>
        )
          ;
      })
    );
  };

  const dispatchNotification = (message: string, severity: Color, time?: number) =>
    dispatch(
      createNotification({
        message,
        severity,
        time
      })
    );

  const createSuccessNotification = (message: string, time?: number) =>
    dispatchNotification(message, 'success', time);

  const createErrorNotification = (message: string, time?: number) =>
    dispatchNotification(message, 'error', time);

  const createWarningNotification = (message: string, time?: number) =>
    dispatchNotification(message, 'warning', time);

  const createInfoNotification = (message: string, time?: number) =>
    dispatchNotification(message, 'info', time);

  return {
    showNotification,
    renderNotification,
    createSuccessNotification,
    createErrorNotification,
    createWarningNotification,
    createInfoNotification
  };
};
export default useNotifications;
