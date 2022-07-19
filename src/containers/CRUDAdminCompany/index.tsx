import React from "react";
import { withCRUD } from "@hoc/index";
import { Company } from "@dto/companies";
import {
  TableCRUDCompany,
  DialogCreateEditCRUDCompany,
} from "@components/index";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<Company>(
  DialogCreateEditCRUDCompany,
  TableCRUDCompany
);

const instanceDescriptor = instancesDescriptor[InstancesDescriptorKeys.company];

const CRUDAdminCompany: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<Company>(instanceDescriptor?.apiRoute || "");
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
    />
  );
};
export default CRUDAdminCompany;
