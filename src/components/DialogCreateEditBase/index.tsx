import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface DialogCreateEditBaseProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * > * > *": {
        padding: theme.spacing(1),
      },
      "& > * > * > * > * > *": {
        padding: theme.spacing(1),
      },
    },
  })
);

const DialogCreateEditBase: React.FunctionComponent<DialogCreateEditBaseProps> =
  ({ children, open, title }: DialogCreateEditBaseProps) => {
    const classes = useStyles();
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
        <DialogContent className={classes.root}>{children}</DialogContent>
      </Dialog>
    );
  };

export default DialogCreateEditBase;
