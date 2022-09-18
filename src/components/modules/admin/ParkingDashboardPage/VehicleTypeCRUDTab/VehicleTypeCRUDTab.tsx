import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { VehicleType } from "@dto/parking";
import { VehicleTypeCRUDTable } from "../VehicleTypeCRUDTable";
import { VehicleTypeCRUDDialogCreateEdit } from "../VehicleTypeCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<VehicleType>(
  VehicleTypeCRUDDialogCreateEdit,
  VehicleTypeCRUDTable
);

export const VehicleTypeCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.vehicleType}
      toStringField="name"
      idField="id"
      withTitle={false}
    />
  );
};
