import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { Company } from "@dto/companies";

import { Table } from "./Table";
import { DialogCreateEdit } from "./DialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<Company>(DialogCreateEdit, Table);

export const CompanyCRUDPage: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.company}
      toStringField="name"
      idField="id"
    />
  );
};
