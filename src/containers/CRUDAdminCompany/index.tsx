import React from "react";
import { withCRUD } from "@hoc/index";
import { Company } from "../../dto/index";
import {
  TableCRUDCompany,
  DialogCreateEditCRUDCompany,
} from "@components/index";
import {
  INSTANCES_NAMES,
  API_ROUTES,
  PERMISSION_INSTANCES,
} from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<Company>(
  DialogCreateEditCRUDCompany,
  TableCRUDCompany
);

const CRUDAdminCompany: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<Company>(API_ROUTES.COMPANIES);
  return (
    <DetailViewHOC
      genericPermission={PERMISSION_INSTANCES.COMPANY.GENERIC}
      instanceNamePlural={INSTANCES_NAMES.COMPANY_PLURAL}
      instanceNameSingular={INSTANCES_NAMES.COMPANY_SINGULAR}
      toStringField="name"
      idField="id"
      fetchAllPaginationMethod={fetchAllPagination}
      deleteMethod={destroy}
      fetchMethod={fetch}
      createMethod={create}
      editMethod={edit}
    />
  );
};
export default CRUDAdminCompany;
