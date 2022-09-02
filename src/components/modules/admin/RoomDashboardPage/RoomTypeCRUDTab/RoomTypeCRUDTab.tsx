import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { RoomType } from "@dto/room";
import { RoomTypeCRUDTable } from "../RoomTypeCRUDTable";
import { RoomTypeCRUDDialogCreateEdit } from "../RoomTypeCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";

const DetailViewHOC = withCRUDReactQuery<RoomType>(
  RoomTypeCRUDDialogCreateEdit,
  RoomTypeCRUDTable
);

export const RoomTypeCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.roomType}
      toStringField="name"
      idField="id"
      withTitle={false}
    />
  );
};
