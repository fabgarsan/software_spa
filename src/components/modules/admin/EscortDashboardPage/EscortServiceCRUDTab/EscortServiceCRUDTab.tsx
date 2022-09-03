import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { EscortService } from "@dto/escorts";
import { EscortServiceCRUDTable } from "../EscortServiceCRUDTable";
import { EscortServiceCRUDDialogCreateEdit } from "../EscortServiceCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<EscortService>(
  EscortServiceCRUDDialogCreateEdit,
  EscortServiceCRUDTable
);

export const EscortServiceCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.escortService}
      toStringField="name"
      idField="id"
      hasSearch
      withTitle={false}
    />
  );
};
