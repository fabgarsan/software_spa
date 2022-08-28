import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { Escort } from "@dto/escorts";
import { EscortCRUDDialogCreateEdit } from "../EscortCRUDDialogCreateEdit";
import { EscortCRUDTable } from "../EscortCRUDTable";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<Escort>(
  EscortCRUDDialogCreateEdit,
  EscortCRUDTable
);

export const EscortCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.escort}
      toStringField="alias"
      idField="id"
      fetchAllParams={{ extended_user__user_type: "A" }}
      hasSearch
      withTitle={false}
    />
  );
};
