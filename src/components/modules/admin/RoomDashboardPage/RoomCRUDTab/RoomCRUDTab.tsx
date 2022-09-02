import React from "react";
import { withCRUDReactQuery } from "@hoc/index";
import { Room } from "@dto/room";
import { RoomCRUDTable } from "../RoomCRUDTable";
import { RoomCRUDDialogCreateEdit } from "../RoomCRUDDialogCreateEdit";
import { InstancesDescriptorKeys } from "@utils/index";
import { GetRoomApiResponse } from "@api/room";

const DetailViewHOC = withCRUDReactQuery<Room, GetRoomApiResponse>(
  RoomCRUDDialogCreateEdit,
  RoomCRUDTable
);

export const RoomCRUDTab: React.FunctionComponent = () => {
  return (
    <DetailViewHOC
      descriptorKey={InstancesDescriptorKeys.room}
      toStringField="number"
      idField="id"
      withTitle={false}
    />
  );
};
