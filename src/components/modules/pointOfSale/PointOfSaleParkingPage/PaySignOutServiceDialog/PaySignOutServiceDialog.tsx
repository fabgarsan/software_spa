import React from "react";
import {
  useFinishParkingServiceMutation,
  useParkingServiceValueToPayQuery,
  usePayParkingServiceMutation,
} from "./PaySignOutServiceDialog.hook";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { UI } from "@utils/constantsUI";
import { GetParkingServiceResponse } from "@api/parking";
import {
  formatIntoMoney,
  displayHoursAndMinutesFromMinutes,
} from "@utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PayServiceDialogProps = {
  parkingService: GetParkingServiceResponse;
  open: boolean;
  onClose: () => void;
};

const renderButtonsForPayment = (onClose: () => void) => (
  <Grid container textAlign="center" spacing={3} height={120}>
    <Grid item xs={6}>
      <Button
        onClick={onClose}
        color="primary"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        endIcon={<FontAwesomeIcon icon={["fal", "cancel"]} />}
      >
        {UI.BUTTON_TEXT_CANCEL}
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        color="secondary"
        type="submit"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        endIcon={<FontAwesomeIcon icon={["fal", "hand-holding-dollar"]} />}
      >
        {UI.BUTTON_TEXT_PAY}
      </Button>
    </Grid>
  </Grid>
);

const renderButtonsForSignOut = (onClose: () => void) => (
  <Grid container textAlign="center" spacing={3} height={120}>
    <Grid item xs={6}>
      <Button
        onClick={onClose}
        color="primary"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        endIcon={<FontAwesomeIcon icon={["fal", "cancel"]} />}
      >
        {UI.BUTTON_TEXT_CANCEL}
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        color="secondary"
        type="submit"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        endIcon={<FontAwesomeIcon icon={["fal", "sign-out"]} />}
      >
        {UI.BUTTON_REGISTER_SIGN_OUT}
      </Button>
    </Grid>
  </Grid>
);

export const PaySignOutServiceDialog = ({
  parkingService: { id: parkingServiceId, paymentTime },
  open,
  onClose,
}: PayServiceDialogProps) => {
  const parkingServiceValueToPayQuery =
    useParkingServiceValueToPayQuery(parkingServiceId);
  const {
    data: parkingServiceValueToPayData,
    isSuccess: parkingServiceValueToPayQueryIsSuccess,
  } = parkingServiceValueToPayQuery;
  const { mutate: payParkingServiceMutate } = usePayParkingServiceMutation({
    parkingServiceId,
    onSuccessCallBack: () => onClose(),
  });
  const { mutate: finishParkingServiceMutate } =
    useFinishParkingServiceMutation({
      parkingServiceId,
      onSuccessCallBack: () => onClose(),
    });
  if (!parkingServiceValueToPayQueryIsSuccess) {
    return <></>;
  }
  const { rateValue, timeElapsed } = parkingServiceValueToPayData;
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          if (paymentTime) {
            finishParkingServiceMutate();
          } else {
            payParkingServiceMutate(rateValue);
          }
        }}
      >
        <DialogTitle>
          {(paymentTime && "Finalizar") || "Pagar"} Servicio
        </DialogTitle>
        <DialogContent>
          <Typography variant="h1">{formatIntoMoney(rateValue)}</Typography>
          <Typography variant="body1" textAlign="center">
            {displayHoursAndMinutesFromMinutes(timeElapsed)}
          </Typography>
        </DialogContent>
        <DialogActions>
          {(!paymentTime && renderButtonsForPayment(onClose)) ||
            renderButtonsForSignOut(onClose)}
        </DialogActions>
      </Box>
    </Dialog>
  );
};
