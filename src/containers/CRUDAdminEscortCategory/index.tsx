import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategory } from "@dto/escorts";
import {
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory,
} from "@components/index";
import {
  INSTANCES_NAMES,
  API_ROUTES,
  PERMISSION_INSTANCES,
} from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategory>(
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory
);

const CRUDAdminEscortCategory: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortCategory>(API_ROUTES.ESCORT_CATEGORY);
  return (
    <DetailViewHOC
      genericPermission={PERMISSION_INSTANCES.ESCORT_CATEGORY.GENERIC}
      instanceNamePlural={INSTANCES_NAMES.ESCORT_CATEGORIES_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR}
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
