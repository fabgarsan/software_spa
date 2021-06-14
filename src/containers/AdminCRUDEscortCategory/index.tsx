import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategory } from "@dbTypes/escorts";
import {
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory,
} from "@components/index";
import { INSTANCES_NAMES, API_ROUTES } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<EscortCategory>(
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory
);

const AdminCRUDEscortCategory: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<EscortCategory>(API_ROUTES.ESCORT_CATEGORY, {
      methods: [
        { method: "create" },
        { method: "fetch" },
        { method: "fetchAllPagination" },
        { method: "edit" },
        { method: "delete" },
      ],
    });
  return (
    <DetailViewHOC
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
export default AdminCRUDEscortCategory;
