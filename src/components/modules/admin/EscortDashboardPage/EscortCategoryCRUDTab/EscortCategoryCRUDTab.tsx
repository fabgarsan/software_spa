import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategory } from "@dto/escorts";
import { EscortCategoryCRUDTable } from "../EscortCategoryCRUDTable";
import { EscortCategoryCRUDDialogCreateEdit } from "../EscortCategoryCRUDDialogCreateEdit";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategory>(
  EscortCategoryCRUDDialogCreateEdit,
  EscortCategoryCRUDTable
);

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

export const EscortCategoryCRUDTab: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortCategory>(instanceDescriptor?.apiRoute || "");
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
      hasSearch
      withTitle={false}
    />
  );
};
