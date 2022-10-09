import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { Printer } from "@dto/sysConfiguration";

import { Table } from "./Table";
import { DialogCreateEdit } from "./DialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<Printer>(DialogCreateEdit, Table);

export const PrinterCRUDPage: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.printer}
      toStringField="name"
      idField="id"
    />
  );
};
