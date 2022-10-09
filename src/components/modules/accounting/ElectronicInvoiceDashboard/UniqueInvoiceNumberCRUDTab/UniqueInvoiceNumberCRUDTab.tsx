import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { UniqueInvoiceNumber } from "@dto/accountingInvoice";
import { UniqueInvoiceNumberCRUDTable } from "../UniqueInvoiceNumberCRUDTable";
import { UniqueInvoiceNumberCRUDDialogCreateEdit } from "../UniqueInvoiceNumberCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<UniqueInvoiceNumber>(
  UniqueInvoiceNumberCRUDDialogCreateEdit,
  UniqueInvoiceNumberCRUDTable
);

export const UniqueInvoiceNumberCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.uniqueInvoiceNumber}
      toStringField="dianResolutionNumber"
      idField="id"
      withTitle={false}
    />
  );
};
