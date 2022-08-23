import React from "react";
import { withCRUD } from "@hoc/index";
import { Company } from "@dto/companies";

import { Table } from "./Table";
import { DialogCreateEdit } from "./DialogCreateEdit";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<Company>(DialogCreateEdit, Table);

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.company];

export const CompanyCRUDPage: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<Company>(instanceDescriptor?.apiRoute || "");
  return (
    <DetailViewHOC
      instancesDescriptorValue={instanceDescriptor}
      toStringField="name"
      idField="id"
      fetchAllPaginationMethod={fetchAllPagination}
      deleteMethod={destroy}
      fetchMethod={fetch}
      createMethod={create}
      editMethod={edit}
    />
  );
};
