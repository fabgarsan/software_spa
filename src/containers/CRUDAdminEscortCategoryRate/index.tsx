import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategoryRate } from "@dto/escorts";
import {
  DialogCreateEditCRUDEscortCategoryRate,
  TableCRUDEscortCategoryRate,
} from "@components/index";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategoryRate>(
  DialogCreateEditCRUDEscortCategoryRate,
  TableCRUDEscortCategoryRate
);
const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortCategoryRate];

const CRUDAdminEscortCategoryRate: React.FunctionComponent = () => {
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
export default CRUDAdminEscortCategoryRate;
