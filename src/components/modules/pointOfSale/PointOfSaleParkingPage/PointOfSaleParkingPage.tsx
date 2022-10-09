import React, { useEffect, useState } from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParkingPlansAvailableQuery } from "@components/modules/pointOfSale/PointOfSaleParkingPage/PointOfSaleParkingPage.hooks";

import {
  GetParkingPlanResponse,
  GetParkingServiceResponse,
  PrintInvoiceResponse,
} from "@api/parking";

import { CreateServiceDialog } from "@components/modules/pointOfSale/PointOfSaleParkingPage/CreateServiceDialog";
import { useCurrentParkingServicesQuery } from "@components/modules/pointOfSale/PointOfSaleParkingPage/ParkingServiceItem/ParkingServiceItem.hook";
import { ParkingServiceItem } from "@components/modules/pointOfSale/PointOfSaleParkingPage/ParkingServiceItem";
import { PaySignOutServiceDialog } from "@components/modules/pointOfSale/PointOfSaleParkingPage/PaySignOutServiceDialog";
import { QueryErrorBoundary } from "@components/shared";
import { useEpsonPrinter } from "@hooks/useEpsonPrinter";
import {
  PrintParkingCarTicket,
  printParkingCarTicket,
  printPOSInvoice,
} from "@printer/parking";

export const PointOfSaleParkingPage: React.FunctionComponent = () => {
  const currentParkingServicesQuery = useCurrentParkingServicesQuery();
  const {
    data: currentParkingServicesData,
    isSuccess: currentParkingServicesQueryIsSuccess,
    refetch: refetchParkingServices,
  } = currentParkingServicesQuery;

  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  const { data: parkingPlansData } = useParkingPlansAvailableQuery();
  const [selectedParkingPlan, setSelectedParkingPlan] =
    useState<GetParkingPlanResponse | null>(null);
  const [selectedParkingService, setSelectedParkingService] =
    useState<GetParkingServiceResponse | null>(null);

  const { connect, printer, setPrinting } = useEpsonPrinter();

  useEffect(() => {
    const ipAddress =
      (isSuccess &&
        getPointOfSaleOpen(pointOfSaleAccessData)?.printerIpAddress) ||
      null;
    if (ipAddress) {
      connect({ printerIPAddress: ipAddress, printerPort: 8008 });
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  const printSignIn = (data: PrintParkingCarTicket) => {
    if (printer) {
      setPrinting();
      printParkingCarTicket({
        data,
        printer,
      });
    }
  };

  const printInvoice = (data: PrintInvoiceResponse) => {
    if (printer) {
      setPrinting();
      printPOSInvoice({
        printer,
        data,
      });
    }
  };

  if (!isSuccess || !pointOfSaleAccessData.openWorkShift) {
    return <></>;
  }
  const openPointOfSale = getPointOfSaleOpen(pointOfSaleAccessData);

  const hasParkingLotServicesSales =
    openPointOfSale?.hasParkingLotServicesSales || false;
  const onCloseCreateParkingService = () => {
    setSelectedParkingPlan(null);
    refetchParkingServices();
  };
  const onClosePayParkingService = () => {
    setSelectedParkingService(null);
    refetchParkingServices();
  };
  if (!hasParkingLotServicesSales) return <></>;
  return (
    <Box>
      {!!selectedParkingPlan && (
        <CreateServiceDialog
          selectedPlan={selectedParkingPlan}
          open={!!setSelectedParkingPlan}
          onClose={onCloseCreateParkingService}
          printSignIn={printSignIn}
        />
      )}
      {!!selectedParkingService && (
        <PaySignOutServiceDialog
          printInvoice={printInvoice}
          parkingService={selectedParkingService}
          onClose={onClosePayParkingService}
          open={!!selectedParkingService}
        />
      )}
      <Box>
        <Typography variant="h5" gutterBottom color="primary">
          Parqueadero
        </Typography>
        <Grid container spacing={2}>
          {parkingPlansData?.map((parkingPlan) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={parkingPlan.id}>
              <Button
                onClick={() => setSelectedParkingPlan(parkingPlan)}
                color="primary"
                variant="contained"
                fullWidth
              >
                {parkingPlan.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <QueryErrorBoundary queries={[currentParkingServicesQuery]}>
        <Box>
          {currentParkingServicesQueryIsSuccess && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Pagados</Typography>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                {currentParkingServicesData
                  .filter(({ paymentTime }) => !!paymentTime)
                  .map((parkingService) => (
                    <ParkingServiceItem
                      onClick={() => setSelectedParkingService(parkingService)}
                      key={parkingService.id}
                      item={parkingService}
                    />
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">En servicio</Typography>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                {currentParkingServicesData
                  .filter(({ paymentTime }) => !paymentTime)
                  .map((parkingService) => (
                    <ParkingServiceItem
                      onClick={() => setSelectedParkingService(parkingService)}
                      key={parkingService.id}
                      item={parkingService}
                    />
                  ))}
              </Grid>
            </Grid>
          )}
        </Box>
      </QueryErrorBoundary>
    </Box>
  );
};
