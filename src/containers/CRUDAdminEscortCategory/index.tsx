import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategory } from "@dto/escorts";
import {
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory,
} from "@components/index";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategory>(
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory
);

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

const CRUDAdminEscortCategory: React.FunctionComponent = () => {
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
export default CRUDAdminEscortCategory;
