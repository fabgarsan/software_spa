import React from "react";
import { TabManager } from "@components/shared";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";
import { RoomCRUDTab } from "./RoomCRUDTab";
import { RoomTypeCRUDTab } from "./RoomTypeCRUDTab";

const { room, roomType } = InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";

const tabManagerName = instancesDescriptor[room].plural;

export const RoomDashboardPage = () => {
  return (
    <TabManager
      labels={[getTabName(room), getTabName(roomType)]}
      title={tabManagerName}
    >
      {({ tabIndex }) => (
        <>
          {tabIndex === 0 && <RoomCRUDTab />}
          {tabIndex === 1 && <RoomTypeCRUDTab />}
        </>
      )}
    </TabManager>
  );
};
