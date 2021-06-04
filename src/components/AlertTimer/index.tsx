import React from 'react';
import {useInterval} from '@hooks/index';
import {Alert, Color} from "@material-ui/lab";

interface AlertTimerProps {
  time: number,
  severity: Color,
  message: string,
  onClose: () => void
}

const AlertTimer = ({message, severity, onClose, time}: AlertTimerProps) => {
  if (time !== 0) {
    useInterval(() => {
      onClose();
    }, time);
  }
  return (
    <Alert
      elevation={6}
      variant="filled"
      severity={severity}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
};
export default AlertTimer;
