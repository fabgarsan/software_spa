import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { EscortCategoryRate } from "@dto/escorts";
import { EscortCategoryRateCRUDTable } from "../EscortCategoryRateCRUDTable";
import { EscortCategoryRateCRUDDialogCreateEdit } from "../EscortCategoryRateCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { GetEscortCategoryRate } from "@api/escort";

const DetailViewHOC = withCRUDReactQuery<
  EscortCategoryRate,
  GetEscortCategoryRate
>(EscortCategoryRateCRUDDialogCreateEdit, EscortCategoryRateCRUDTable);

export const EscortCategoryRateCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.escortCategoryRate}
      toStringField="toString"
      idField="id"
      hasSearch
      withTitle={false}
    />
  );
};
