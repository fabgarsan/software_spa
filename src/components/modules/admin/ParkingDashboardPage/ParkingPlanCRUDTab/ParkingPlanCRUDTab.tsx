import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { ParkingPlan } from "@dto/parking";
import { ParkingPlanCRUDTable } from "../ParkingPlanCRUDTable";
import { ParkingPlanCRUDDialogCreateEdit } from "../ParkingPlanCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { GetParkingPlan } from "@api/parking";

const DetailViewHOC = withCRUDReactQuery<ParkingPlan, GetParkingPlan>(
  ParkingPlanCRUDDialogCreateEdit,
  ParkingPlanCRUDTable
);

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
