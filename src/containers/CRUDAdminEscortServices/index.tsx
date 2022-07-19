import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortService } from "@dto/escorts";
import {
  DialogCreateEditCRUDEscortService,
  TableCRUDEscortService,
} from "@components/index";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortService>(
  DialogCreateEditCRUDEscortService,
  TableCRUDEscortService
);
const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.escortService];

const CRUDAdminEscortServices: React.FunctionComponent = () => {
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
export default CRUDAdminEscortServices;
