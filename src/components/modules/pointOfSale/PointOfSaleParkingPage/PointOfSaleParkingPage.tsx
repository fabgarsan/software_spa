import React, { useState } from "react";
import {
  usePointOfSaleAccessQuery,
  getPointOfSaleOpen,
} from "@api/pointOfSale";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParkingPlansQuery } from "@components/modules/pointOfSale/PointOfSaleParkingPage/PointOfSaleParkingPage.hooks";

import {
  GetParkingPlanResponse,
  GetParkingServiceResponse,
} from "@api/parking";

import { CreateServiceDialog } from "@components/modules/pointOfSale/PointOfSaleParkingPage/CreateServiceDialog";
import { useCurrentParkingServicesQuery } from "@components/modules/pointOfSale/PointOfSaleParkingPage/ParkingServiceItem/ParkingServiceItem.hook";
import { ParkingServiceItem } from "@components/modules/pointOfSale/PointOfSaleParkingPage/ParkingServiceItem";
import { PaySignOutServiceDialog } from "@components/modules/pointOfSale/PointOfSaleParkingPage/PaySignOutServiceDialog";
import { QueryErrorBoundary } from "@components/shared";

export const PointOfSaleParkingPage: React.FunctionComponent = () => {
  const currentParkingServicesQuery = useCurrentParkingServicesQuery();
  const {
    data: currentParkingServicesData,
    isSuccess: currentParkingServicesQueryIsSuccess,
    refetch: refetchParkingServices,
  } = currentParkingServicesQuery;

  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  const { data: parkingPlansData } = useParkingPlansQuery();
  const [selectedParkingPlan, setSelectedParkingPlan] =
    useState<GetParkingPlanResponse | null>(null);
  const [selectedParkingService, setSelectedParkingService] =
    useState<GetParkingServiceResponse | null>(null);

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
        />
      )}
      {!!selectedParkingService && (
        <PaySignOutServiceDialog
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
