import React from "react";
import { useInterval } from "@hooks/index";
import { Alert, Color } from "@material-ui/lab";

interface AlertTimerProps {
  time: number;
  severity: Color;
  message: string;
  onClose: () => void;
}

const AlertTimer: React.FunctionComponent<AlertTimerProps> = ({
  message,
  severity,
  onClose,
  time,
}: AlertTimerProps) => {
  if (time !== 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInterval(() => {
      onClose();
    }, time);
  }
  return (
    <Alert
      elevation={6}
      variant="filled"
      style={{ zIndex: 1300 }}
      severity={severity}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
};
export default AlertTimer;
