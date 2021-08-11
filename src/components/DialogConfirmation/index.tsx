import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  children?: React.ReactNode;
  open: boolean;
  fullWidth?: boolean;
  fullScreen?: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const DialogConfirmation: React.FunctionComponent<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onAccept,
  onCancel,
  children,
  fullWidth,
  fullScreen,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onAccept} color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DialogConfirmation.defaultProps = {
  children: null,
  fullWidth: false,
  fullScreen: false,
};

export default DialogConfirmation;
