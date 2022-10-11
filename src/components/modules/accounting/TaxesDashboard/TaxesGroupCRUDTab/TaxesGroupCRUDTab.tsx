import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { TaxesGroupCRUDTable } from "../TaxesGroupCRUDTable";
import { TaxesGroupCRUDDialogCreateEdit } from "../TaxesGroupCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { GetTaxGroupResponse } from "@api/accountingTax";
import { TaxGroup } from "@dto/accountingTaxes";

const DetailViewHOC = withCRUDReactQuery<TaxGroup, GetTaxGroupResponse>(
  TaxesGroupCRUDDialogCreateEdit,
  TaxesGroupCRUDTable
);

export const TaxesGroupCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.taxGroup}
      toStringField="name"
      idField="id"
      withTitle={false}
    />
  );
};
