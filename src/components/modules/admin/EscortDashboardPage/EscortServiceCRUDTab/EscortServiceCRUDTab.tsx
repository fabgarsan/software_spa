import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortService } from "@dto/escorts";
import { EscortServiceCRUDTable } from "../EscortServiceCRUDTable";
import { EscortServiceCRUDDialogCreateEdit } from "../EscortServiceCRUDDialogCreateEdit";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortService>(
  EscortServiceCRUDDialogCreateEdit,
  EscortServiceCRUDTable
);
const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortService];

export const EscortServiceCRUDTab: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortService>(instanceDescriptor?.apiRoute || "");
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
