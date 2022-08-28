import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { ExtendedUser } from "@dto/users";
import { Table } from "./Table";
import { DialogCreateEdit } from "./DialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<ExtendedUser>(DialogCreateEdit, Table);

export const EmployeeCRUDPage: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.employee}
      toStringField="fullName"
      idField="id"
      fetchAllParams={{ extended_user__user_type: "T" }}
      hasSearch
    />
  );
};
