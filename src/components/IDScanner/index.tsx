import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { BloodType, GenderType } from "@dto/users";

interface IDScannerProp {
  children: React.ReactNode;
  onBlur: (
    dateOfBirth: Date,
    bloodType: BloodType,
    firstName: string,
    lastName: string,
    idNumber: string,
    gender: GenderType,
    idType: string
  ) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scannerIcon: {
      cursor: "pointer",
    },
    textField: {
      padding: theme.spacing(2),
    },
  })
);

const IDScanner = ({ children, onBlur }: IDScannerProp) => {
  const [openIdScanner, setOpenIdScanner] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <Box>
      <Box>{!openIdScanner && children}</Box>
      <Box>
        {openIdScanner && (
          <TextField
            onBlur={({ target: { value: scannedText } }) => {
              const splitText = scannedText.split(",");
              if (splitText.length > 8) {
                const [
                  idNumber,
                  fistLastName,
                  secondLastName,
                  firstName,
                  middleName,
                  gender,
                  dataDateOfBirth,
                  bloodType,
                  ...rest
                ] = splitText.map((text) => text.trim());
                const year = parseInt(dataDateOfBirth?.substr(0, 4), 10);
                const month = parseInt(dataDateOfBirth?.substr(4, 2), 10);
                const date = parseInt(dataDateOfBirth?.substr(6, 2), 10);
                const dateOfBirth = new Date(year, month - 1, date);

                const firstNameJoined = `${firstName} ${middleName}`.trim();
                const lastNameJoined =
                  `${fistLastName} ${secondLastName}`.trim();

                onBlur(
                  dateOfBirth,
                  // @ts-ignore
                  bloodType?.replace(" ", ""),
                  firstNameJoined,
                  lastNameJoined,
                  parseInt(idNumber, 10)?.toString(),
                  // @ts-ignore
                  gender,
                  "CC"
                );
              }
              setOpenIdScanner(false);
            }}
            autoFocus
            className={classes.textField}
            fullWidth
          />
        )}
      </Box>
      <Box>
        <FontAwesomeIcon
          className={classes.scannerIcon}
          icon={["fal", openIdScanner ? "keyboard" : "scanner"]}
          size="2x"
          onClick={() => setOpenIdScanner(!openIdScanner)}
        />
      </Box>
    </Box>
  );
};

export default IDScanner;
