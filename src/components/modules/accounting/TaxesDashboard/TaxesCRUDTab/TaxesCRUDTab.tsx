import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { TaxesCRUDTable } from "../TaxesCRUDTable";
import { TaxesCRUDDialogCreateEdit } from "../TaxesCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { GetTaxResponse } from "@api/accountingTax";
import { Tax } from "@dto/accountingTaxes";

const DetailViewHOC = withCRUDReactQuery<Tax, GetTaxResponse>(
  TaxesCRUDDialogCreateEdit,
  TaxesCRUDTable
);

export const TaxesCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.tax}
      toStringField="name"
      idField="id"
      withTitle={false}
    />
  );
};
