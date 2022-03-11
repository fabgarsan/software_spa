import React from "react";
import { withCRUD } from "@hoc/index";
import { Escort } from "../../dto/escorts";
import { TableCRUDEscort, DialogCreateEditCRUDEscort } from "@components/index";
import {
  INSTANCES_NAMES,
  API_ROUTES,
  PERMISSION_INSTANCES,
} from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<Escort>(
  DialogCreateEditCRUDEscort,
  TableCRUDEscort
);

const CRUDAdminEscort: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<Escort>(API_ROUTES.USER);
  return (
    <DetailViewHOC
      genericPermission={PERMISSION_INSTANCES.ESCORT.GENERIC}
      instanceNamePlural={INSTANCES_NAMES.ESCORT_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.ESCORT_SINGULAR}
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
export default CRUDAdminEscort;
