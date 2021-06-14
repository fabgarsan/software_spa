import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

interface DialogCreateEditBaseProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
}

const DialogCreateEditBase: React.FunctionComponent<DialogCreateEditBaseProps> =
  ({ children, open, title }: DialogCreateEditBaseProps) => {
    if (!open) {
      return <></>;
    }
    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  };

export default DialogCreateEditBase;
