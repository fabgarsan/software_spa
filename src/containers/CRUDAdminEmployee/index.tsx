import React from "react";
import { withCRUD } from "@hoc/index";
import { ExtendedUser } from "@dto/users";
import {
  TableCRUDEmployee,
  DialogCreateEditCRUDEmployee,
} from "@components/index";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

import { useCRUDGenericApiCall } from "@hooks/index";

const DetailViewHOC = withCRUD<ExtendedUser>(
  DialogCreateEditCRUDEmployee,
  TableCRUDEmployee
);

const instanceDescriptor =
  instancesDescriptor[InstancesDescriptorKeys.employee];

const CRUDAdminEmployee: React.FunctionComponent = () => {
  const { fetchAllPagination, create, destroy, fetch, edit } =
    useCRUDGenericApiCall<ExtendedUser>(instanceDescriptor?.apiRoute || "");
  return (
    <DetailViewHOC
      instancesDescriptorValue={instanceDescriptor}
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
