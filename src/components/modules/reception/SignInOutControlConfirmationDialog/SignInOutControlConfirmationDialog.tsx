import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  FormHelperText,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { FORM_FIELDS, UI } from "@utils/constantsUI";

interface SignInControlConfirmationDialogProps {
  setTextAnswer: (answer: string) => void;
  answer: string;
  fullName: string;
  questionType: "first" | "last" | null;
  title: string;
  errorMessage: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.main,
    },
  })
);

const question = (kind: "first" | "last" | null, fullName: string) =>
  `Digite los 3 ${
    kind === "first" ? "PRIMEROS" : "ÚLTIMOS"
  } caracteres del número de identificación de ${fullName}`;

export const SignInOutControlConfirmationDialog = ({
  fullName,
  questionType,
  setTextAnswer,
  answer,
  onCancel,
  onConfirm,
  open,
  errorMessage,
  title,
}: SignInControlConfirmationDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle id="form-dialog-title">
        {title} {fullName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {question(questionType, fullName)}
        </DialogContentText>
        <Box textAlign="center">
          <TextField
            value={answer}
            label={FORM_FIELDS.SIGN_IN_OUT_FORM.LABEL_ANSWER}
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: 3 }}
            onChange={(event) => setTextAnswer(event.target.value)}
          />
          {errorMessage && (
            <Box>
              <FormHelperText className={classes.error}>
                {errorMessage}
              </FormHelperText>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {UI.BUTTON_TEXT_CANCEL}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {UI.BUTTON_TEXT_ACCEPT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
