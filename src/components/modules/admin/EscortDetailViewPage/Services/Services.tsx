import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Escort, EscortService } from "@dto/index";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";
import { InstancesDescriptorKeys } from "@utils/instancesDescriptors";
import { QueryErrorBoundary, BackdropLoading } from "@components/shared";
import {
  useAddEscortServiceMutation,
  useRemoveEscortServiceMutation,
} from "@api/user";

interface ServicesProps {
  escortId: string | undefined;
  currentServices: number[];
}

const {
  escortService: escortServiceDescriptorKey,
  escort: escortDescriptorKey,
} = InstancesDescriptorKeys;

export const Services = ({ currentServices, escortId = "" }: ServicesProps) => {
  const { useFetch: fetchEscort } =
    useReactQueryCRUDGenericApiCall<Escort>(escortDescriptorKey);
  const escortQuery = fetchEscort({ id: escortId || "" });
  const { refetch: refetchEscortQuery } = escortQuery;
  const { useFetchAll: fetchServices } =
    useReactQueryCRUDGenericApiCall<EscortService>(escortServiceDescriptorKey);
  const servicesQuery = fetchServices({});
  const { data: servicesData, isSuccess: servicesQueryIsSuccess } =
    servicesQuery;
  const { mutate: addServiceMutate, isLoading: addServiceMutateIsLoading } =
    useAddEscortServiceMutation({
      escortId,
      onSuccessCallBack: () => {
        refetchEscortQuery();
      },
    });
  const {
    mutate: removeServiceMutate,
    isLoading: removeServiceMutateIsLoading,
  } = useRemoveEscortServiceMutation({
    escortId,
    onSuccessCallBack: () => {
      refetchEscortQuery();
    },
  });
  const onCheckService = async (serviceId: number, checked: boolean) => {
    if (checked) await addServiceMutate(serviceId);
    if (!checked) await removeServiceMutate(serviceId);
  };
  return (
    <Box paddingLeft={2}>
      <Typography variant="h5">Servicios</Typography>
      <BackdropLoading
        isOpen={addServiceMutateIsLoading || removeServiceMutateIsLoading}
      />
      <QueryErrorBoundary queries={[servicesQuery]}>
        <FormGroup row>
          {servicesQueryIsSuccess &&
            servicesData.map((service) => (
              <FormControlLabel
                key={service.id}
                control={
                  <Checkbox
                    checked={currentServices.includes(service.id) || false}
                    onChange={({ target: { checked } }) =>
                      onCheckService(service.id, checked)
                    }
                    name={service.name}
                  />
                }
                label={service.name}
              />
            ))}
        </FormGroup>
      </QueryErrorBoundary>
    </Box>
  );
};
