import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AlertTimer } from "@components/shared";
import { AlertColor } from "@mui/lab";
import {
  createNotification,
  getNotifications,
  removeNotification,
} from "@stores/notificationSlice";
import store from "@stores/store";

const useNotifications = () => {
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
          <Box marginTop={2} key={key}>
            <AlertTimer
              severity={values.severity}
              time={values.time}
              onClose={() => store.dispatch(removeNotification(key))}
              message={values.message}
            />
          </Box>
        );
      })
    );
  };

  const dispatchNotification = (
    message: string,
    severity: AlertColor,
    time?: number
  ) =>
    store.dispatch(
      createNotification({
        message,
        severity,
        time,
      })
    );

  const createSuccessNotification = (message: string, time?: number) =>
    dispatchNotification(message, "success", time);

  const createErrorNotification = (message: string, time?: number) =>
    dispatchNotification(message, "error", time);

  const createWarningNotification = (message: string, time?: number) =>
    dispatchNotification(message, "warning", time);

  const createInfoNotification = (message: string, time?: number) =>
    dispatchNotification(message, "info", time);

  return {
    showNotification,
    renderNotification,
    createSuccessNotification,
    createErrorNotification,
    createWarningNotification,
    createInfoNotification,
  };
};
export default useNotifications;
