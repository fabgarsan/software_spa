import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { PointOfSale } from "@dto/pointOfSale";

import { Table } from "./Table";
import { DialogCreateEdit } from "./DialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<PointOfSale>(DialogCreateEdit, Table);

export const PointOfSaleCRUDPage: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.pointOfSale}
      toStringField="name"
      idField="id"
    />
  );
};
