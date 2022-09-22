import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { ParkingPlanCRUDTable } from "../ParkingPlanCRUDTable";
import { ParkingPlanCRUDDialogCreateEdit } from "../ParkingPlanCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { CreateParkingPlanRequest, GetParkingPlanResponse } from "@api/parking";

const DetailViewHOC = withCRUDReactQuery<
  GetParkingPlanResponse,
  GetParkingPlanResponse,
  CreateParkingPlanRequest
>(ParkingPlanCRUDDialogCreateEdit, ParkingPlanCRUDTable);

export const ParkingPlanCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.parkingPlan}
      toStringField="name"
      idField="id"
      withTitle={false}
    />
  );
};
