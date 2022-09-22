import React from "react";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";
import { DetailViewGeneric, BooleanIcon } from "@components/shared";
import { GetParkingPlanResponse } from "@api/parking";
import { useParams } from "react-router-dom";
import { withCRUDReactQuery } from "@hoc/withCRUDReactQuery";
import { ParkingRate } from "@dto/parking";
import { ParkingRateCRUDDialogCreateEdit } from "@components/modules/admin/ParkingPlanDetailViewPage/ParkingRateCRUDDialogCreateEdit";
import { ParkingRateCRUDTable } from "@components/modules/admin/ParkingPlanDetailViewPage/ParkingRateCRUDTable";
import { Box } from "@mui/material";

const { parkingPlan: parkingPlanKeyDescriptorKey } = InstancesDescriptorKeys;

const instanceDescriptorParkingPlan =
  instancesDescriptor[parkingPlanKeyDescriptorKey];

const DetailViewHOC = withCRUDReactQuery<ParkingRate>(
  ParkingRateCRUDDialogCreateEdit,
  ParkingRateCRUDTable
);

export const ParkingPlanDetailViewPage: React.FunctionComponent = () => {
  const { id: parkingPlanId } = useParams();

  const { useFetch: fetchParkingPlan } =
    useReactQueryCRUDGenericApiCall<GetParkingPlanResponse>(
      parkingPlanKeyDescriptorKey
    );

  const parkingPlanQuery = fetchParkingPlan({ id: parkingPlanId || "" });
  const { data: parkingPlanData, isSuccess: parkingPlanQueryIsSuccess } =
    parkingPlanQuery;

  const attributes = parkingPlanQueryIsSuccess
    ? [
        {
          label: "Tipo Vehículo",
          value: parkingPlanData.vehicleTypeName,
        },
        {
          label: "Lunes",
          value: <BooleanIcon value={parkingPlanData.monday} />,
        },
        {
          label: "Mártes",
          value: <BooleanIcon value={parkingPlanData.tuesday} />,
        },
        {
          label: "Miércoles",
          value: <BooleanIcon value={parkingPlanData.wednesday} />,
        },
        {
          label: "Jueves",
          value: <BooleanIcon value={parkingPlanData.thursday} />,
        },
        {
          label: "Viernes",
          value: <BooleanIcon value={parkingPlanData.friday} />,
        },
        {
          label: "Sábado",
          value: <BooleanIcon value={parkingPlanData.saturday} />,
        },
        {
          label: "Domíngo",
          value: <BooleanIcon value={parkingPlanData.sunday} />,
        },
      ]
    : [];
  return (
    <DetailViewGeneric
      canView
      title={`${instanceDescriptorParkingPlan.singular} ${
        (parkingPlanQueryIsSuccess && parkingPlanData.name) || "Cargando..."
      }`}
      attributes={attributes}
    >
      <DetailViewHOC
        descriptorKey={InstancesDescriptorKeys.parkingPlanRate}
        toStringField="minutes"
        idField="id"
        fetchAllParams={{ parking_plan__id: parkingPlanId }}
      />
      <Box paddingBottom={3} />
    </DetailViewGeneric>
  );
};
