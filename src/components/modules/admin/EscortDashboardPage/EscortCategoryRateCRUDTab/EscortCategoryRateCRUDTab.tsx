import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategoryRate } from "@dto/escorts";
import { EscortCategoryRateCRUDTable } from "../EscortCategoryRateCRUDTable";
import { EscortCategoryRateCRUDDialogCreateEdit } from "../EscortCategoryRateCRUDDialogCreateEdit";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategoryRate>(
  EscortCategoryRateCRUDDialogCreateEdit,
  EscortCategoryRateCRUDTable
);
const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategoryRate];

export const EscortCategoryRateCRUDTab: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortCategoryRate>(
      instanceDescriptor?.apiRoute || ""
    );
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
