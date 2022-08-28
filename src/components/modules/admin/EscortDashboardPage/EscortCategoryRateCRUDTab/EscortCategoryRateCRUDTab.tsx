import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { EscortCategoryRate } from "@dto/escorts";
import { EscortCategoryRateCRUDTable } from "../EscortCategoryRateCRUDTable";
import { EscortCategoryRateCRUDDialogCreateEdit } from "../EscortCategoryRateCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<EscortCategoryRate>(
  EscortCategoryRateCRUDDialogCreateEdit,
  EscortCategoryRateCRUDTable
);

export const EscortCategoryRateCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.escortCategoryRate}
      toStringField="name"
      idField="id"
      hasSearch
      withTitle={false}
    />
  );
};
