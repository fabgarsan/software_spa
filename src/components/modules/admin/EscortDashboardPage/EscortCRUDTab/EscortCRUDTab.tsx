import React from "react";
import { withCRUD } from "@hoc/index";
import { Escort } from "@dto/escorts";
import { EscortCRUDDialogCreateEdit } from "../EscortCRUDDialogCreateEdit";
import { EscortCRUDTable } from "../EscortCRUDTable";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<Escort>(
  EscortCRUDDialogCreateEdit,
  EscortCRUDTable
);

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.escort];

export const EscortCRUDTab: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<Escort>(instanceDescriptor?.apiRoute || "");
  return (
    <DetailViewHOC
      instancesDescriptorValue={instanceDescriptor}
      toStringField="alias"
      idField="id"
      fetchAllPaginationMethod={fetchAllPagination}
      deleteMethod={destroy}
      fetchMethod={fetch}
      createMethod={create}
      editMethod={edit}
      fetchAllParams={{ extended_user__user_type: "A" }}
      hasSearch
      withTitle={false}
    />
  );
};
