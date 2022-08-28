import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { EscortCategory } from "@dto/escorts";
import { EscortCategoryCRUDTable } from "../EscortCategoryCRUDTable";
import { EscortCategoryCRUDDialogCreateEdit } from "../EscortCategoryCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<EscortCategory>(
  EscortCategoryCRUDDialogCreateEdit,
  EscortCategoryCRUDTable
);

export const EscortCategoryCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.escortCategory}
      toStringField="name"
      idField="id"
      hasSearch
      withTitle={false}
    />
  );
};
