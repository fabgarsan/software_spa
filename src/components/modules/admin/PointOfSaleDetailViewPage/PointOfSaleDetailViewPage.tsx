import React from "react";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import {
  DetailViewGeneric,
  BooleanIcon,
  QueryErrorBoundary,
} from "@components/shared";

import { useParams } from "react-router-dom";
import {
  usePointOfSaleByIdQuery,
  useActiveEmployeeUsersQuery,
  useAddAuthorizedEmployeeMutation,
  useRemoveAuthorizedEmployeeMutation,
} from "@components/modules/admin/PointOfSaleDetailViewPage/PointOfSaleDetailViewPage.hooks";
import { Box, Checkbox, Typography } from "@mui/material";

const { pointOfSale: pointOfSaleKeyDescriptorKey } = InstancesDescriptorKeys;

const instanceDescriptorParkingPlan =
  instancesDescriptor[pointOfSaleKeyDescriptorKey];

export const PointOfSaleDetailViewPage: React.FunctionComponent = () => {
  const { id: pointOfSaleId } = useParams();

  const pointOfSaleQuery = usePointOfSaleByIdQuery(Number(pointOfSaleId));
  const {
    data: pointOfSaleData,
    isSuccess: pointOfSaleQueryIsSuccess,
    refetch: pointOfSaleRefetch,
  } = pointOfSaleQuery;

  const { mutate: addAuthorizedUserMutate } = useAddAuthorizedEmployeeMutation({
    pointOfSaleId: Number(pointOfSaleId),
    onSuccessCallBack: () => pointOfSaleRefetch(),
  });

  const { mutate: removeAuthorizedUserMutate } =
    useRemoveAuthorizedEmployeeMutation({
      pointOfSaleId: Number(pointOfSaleId),
      onSuccessCallBack: () => pointOfSaleRefetch(),
    });

  const activeEmployeeUsersQuery = useActiveEmployeeUsersQuery();
  const {
    data: activeEmployeesData,
    isSuccess: activeEmployeesQueryIsSuccess,
  } = activeEmployeeUsersQuery;

  const attributes = pointOfSaleQueryIsSuccess
    ? [
        {
          label: "Activo",
          value: <BooleanIcon value={pointOfSaleData.active} />,
        },
      ]
    : [];
  return (
    <DetailViewGeneric
      canView
      title={`${instanceDescriptorParkingPlan.singular} ${
        (pointOfSaleQueryIsSuccess && pointOfSaleData.name) || "Cargando..."
      }`}
      attributes={attributes}
    >
      <QueryErrorBoundary queries={[pointOfSaleQuery]} loadOnFetching={true}>
        <Box>
          <Typography variant="h6">Usuarios Autorizados</Typography>
          {activeEmployeesQueryIsSuccess &&
            activeEmployeesData.map(({ id, fullName }) => {
              const isAuthorized =
                pointOfSaleData?.authorizedUsers.includes(id) || false;
              return (
                <Box onClick={() => addAuthorizedUserMutate(id)} key={id}>
                  {fullName}
                  <Checkbox
                    checked={isAuthorized}
                    onChange={() =>
                      isAuthorized
                        ? removeAuthorizedUserMutate(id)
                        : addAuthorizedUserMutate(id)
                    }
                  />
                </Box>
              );
            })}
        </Box>
      </QueryErrorBoundary>
    </DetailViewGeneric>
  );
};
