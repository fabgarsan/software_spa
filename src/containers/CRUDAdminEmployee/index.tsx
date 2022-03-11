import React from "react";
import { withCRUD } from "@hoc/index";
import { ExtendedUser } from "../../dto/index";
import {
  TableCRUDEmployee,
  DialogCreateEditCRUDEmployee,
} from "@components/index";
import {
  INSTANCES_NAMES,
  API_ROUTES,
  PERMISSION_INSTANCES,
} from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<ExtendedUser>(
  DialogCreateEditCRUDEmployee,
  TableCRUDEmployee
);

const CRUDAdminEmployee: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<ExtendedUser>(API_ROUTES.USER);
  return (
    <DetailViewHOC
      genericPermission={PERMISSION_INSTANCES.EMPLOYEE.GENERIC}
      instanceNamePlural={INSTANCES_NAMES.EMPLOYEE_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.EMPLOYEE_SINGULAR}
      toStringField="fullName"
      idField="id"
      fetchAllPaginationMethod={fetchAllPagination}
      deleteMethod={destroy}
      fetchMethod={fetch}
      createMethod={create}
      editMethod={edit}
      fetchAllParams={{ extended_user__user_type: "T" }}
      hasSearch
    />
  );
};
export default CRUDAdminEmployee;
