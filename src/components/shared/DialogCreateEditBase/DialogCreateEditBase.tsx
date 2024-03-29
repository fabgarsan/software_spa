import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

interface DialogCreateEditBaseProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  nonFieldErrors?: string[] | unknown;
  fullWidth?: boolean;
  maxWidth?: "lg" | "xs" | "sm" | "md" | "xl";
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

export const DialogCreateEditBase: React.FunctionComponent<
  DialogCreateEditBaseProps
> = ({
  children,
  open,
  title,
  nonFieldErrors,
  maxWidth,
  fullWidth = true,
}: DialogCreateEditBaseProps) => {
  const classes = useStyles();
  if (!open) {
    return <></>;
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={maxWidth || "lg"}
      fullWidth={fullWidth}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent className={classes.root}>
        {children}
        {Array.isArray(nonFieldErrors) && nonFieldErrors && (
          <Box>
            <Grid item xs={12}>
              {nonFieldErrors.map((nonFieldError) => (
                <Box key={nonFieldError}>
                  <Typography
                    align="center"
                    color="error"
                    paragraph
                    variant="body1"
                  >
                    {nonFieldError}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
