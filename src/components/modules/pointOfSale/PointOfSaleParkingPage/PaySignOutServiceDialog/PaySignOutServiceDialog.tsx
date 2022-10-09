import React from "react";
import {
  useFinishParkingServiceMutation,
  useParkingServiceValueToPayQuery,
  usePayParkingServiceMutation,
  usePrintParkingInvoiceQuery,
} from "./PaySignOutServiceDialog.hook";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { UI } from "@utils/constantsUI";
import { GetParkingServiceResponse, PrintInvoiceResponse } from "@api/parking";
import {
  displayHoursAndMinutesFromMinutes,
  formatIntoMoney,
} from "@utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackdropLoading } from "@components/shared";

type PayServiceDialogProps = {
  parkingService: GetParkingServiceResponse;
  open: boolean;
  onClose: () => void;
  printInvoice: (data: PrintInvoiceResponse) => void;
};

const renderButtonsForPayment = ({
  disabledPayButton,
  disabledCancelButton,
  onClose,
}: {
  onClose: () => void;
  disabledPayButton: boolean;
  disabledCancelButton: boolean;
}) => (
  <Grid container textAlign="center" spacing={3} height={120}>
    <Grid item xs={6}>
      <Button
        onClick={onClose}
        color="primary"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        disabled={disabledCancelButton}
        endIcon={<FontAwesomeIcon icon={["fal", "cancel"]} />}
      >
        {UI.BUTTON_TEXT_CANCEL}
      </Button>
    </Grid>
    <Grid item xs={6}>
      <LoadingButton
        loading={disabledPayButton}
        loadingPosition="start"
        color="secondary"
        type="submit"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        endIcon={<FontAwesomeIcon icon={["fal", "hand-holding-dollar"]} />}
      >
        {UI.BUTTON_TEXT_PAY}
      </LoadingButton>
    </Grid>
  </Grid>
);

const renderButtonsForSignOut = ({
  disabledSignOutButton,
  disabledCancelButton,
  onClose,
  onPrintInvoice,
}: {
  onPrintInvoice: () => void;
  onClose: () => void;
  disabledSignOutButton: boolean;
  disabledCancelButton: boolean;
}) => (
  <Grid container textAlign="center" spacing={3} height={240}>
    <Grid item xs={12}>
      <Button
        onClick={onPrintInvoice}
        color="primary"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        disabled={disabledCancelButton}
        endIcon={<FontAwesomeIcon icon={["fal", "print"]} />}
      >
        {UI.BUTTON_TEXT_PRINT}
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        onClick={onClose}
        color="primary"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        disabled={disabledCancelButton}
        endIcon={<FontAwesomeIcon icon={["fal", "cancel"]} />}
      >
        {UI.BUTTON_TEXT_CANCEL}
      </Button>
    </Grid>
    <Grid item xs={6}>
      <LoadingButton
        color="secondary"
        type="submit"
        variant="contained"
        fullWidth
        style={{ height: "100%" }}
        loading={disabledSignOutButton}
        loadingPosition="start"
        endIcon={<FontAwesomeIcon icon={["fal", "sign-out"]} />}
      >
        {UI.BUTTON_REGISTER_SIGN_OUT}
      </LoadingButton>
    </Grid>
  </Grid>
);

export const PaySignOutServiceDialog = ({
  parkingService: { id: parkingServiceId, paymentTime },
  printInvoice,
  open,
  onClose,
}: PayServiceDialogProps) => {
  const parkingServiceValueToPayQuery =
    useParkingServiceValueToPayQuery(parkingServiceId);
  const {
    data: parkingServiceValueToPayData,
    isSuccess: parkingServiceValueToPayQueryIsSuccess,
  } = parkingServiceValueToPayQuery;
  const {
    mutate: payParkingServiceMutate,
    isLoading: payParkingServiceMutateIsLoading,
  } = usePayParkingServiceMutation({
    parkingServiceId,
    callback: onClose,
  });
  const {
    mutate: finishParkingServiceMutate,
    isLoading: finishParkingServiceMutateIsLoading,
  } = useFinishParkingServiceMutation({
    parkingServiceId,
    onSuccessCallBack: () => onClose(),
  });
  const printParkingInvoiceQuery = usePrintParkingInvoiceQuery({
    parkingServiceId,
    enabled: false,
    callback: (data) => printInvoice(data),
  });

  const {
    refetch: refetchPrintInvoiceInfo,
    isFetching: printParkingInvoiceQueryIsFetching,
  } = printParkingInvoiceQuery;

  if (!parkingServiceValueToPayQueryIsSuccess) {
    return <BackdropLoading isOpen />;
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
          {(!paymentTime &&
            renderButtonsForPayment({
              onClose,
              disabledPayButton: payParkingServiceMutateIsLoading,
              disabledCancelButton: payParkingServiceMutateIsLoading,
            })) ||
            renderButtonsForSignOut({
              onClose,
              disabledSignOutButton:
                finishParkingServiceMutateIsLoading ||
                printParkingInvoiceQueryIsFetching,
              disabledCancelButton:
                finishParkingServiceMutateIsLoading ||
                printParkingInvoiceQueryIsFetching,
              onPrintInvoice: refetchPrintInvoiceInfo,
            })}
        </DialogActions>
      </Box>
    </Dialog>
  );
};
