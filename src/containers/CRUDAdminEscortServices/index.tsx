import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortService } from "@dbTypes/escorts";
import {
  DialogCreateEditCRUDEscortService,
  TableCRUDEscortService,
} from "@components/index";
import {
  INSTANCES_NAMES,
  API_ROUTES,
  PERMISSION_INSTANCES,
} from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortService>(
  DialogCreateEditCRUDEscortService,
  TableCRUDEscortService
);

const CRUDAdminEscortServices: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortService>(API_ROUTES.ESCORT_SERVICES);
  return (
    <DetailViewHOC
      genericPermission={PERMISSION_INSTANCES.ESCORT_SERVICE.GENERIC}
      instanceNamePlural={INSTANCES_NAMES.ESCORT_SERVICE_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.ESCORT_SERVICE_SINGULAR}
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
