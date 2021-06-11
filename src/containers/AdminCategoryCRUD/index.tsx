import React from "react";
import { withCRUD } from "@hoc/index";
import { EscortCategory } from "@dbTypes/escorts";
import useAdminCategoryCRUDApi from "@containers/AdminCategoryCRUD/AdminCategoryCRUD.hooks";
import {
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory,
} from "@components/index";
import { INSTANCES_NAMES } from "@utils/index";

const DetailViewHOC = withCRUD<EscortCategory>(
  DialogCreateEditCRUDEscortCategory,
  TableCRUDEscortCategory
);

const AdminCategoryCRUD: React.FunctionComponent = () => {
  const { fetchAll, create, destroy, fetch, edit } = useAdminCategoryCRUDApi();
  return (
    <DetailViewHOC
      instanceNamePlural={INSTANCES_NAMES.ESCORT_CATEGORIES_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR}
      toStringField="name"
      idField="id"
      fetchAllMethod={fetchAll}
      deleteMethod={destroy}
      fetchMethod={fetch}
      createMethod={create}
      editMethod={edit}
    />
  );
};
export default AdminCategoryCRUD;
