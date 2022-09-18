import React from "react";
import { TabManager } from "@components/shared";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";
import { ParkingPlanCRUDTab } from "./ParkingPlanCRUDTab";
import { VehicleTypeCRUDTab } from "./VehicleTypeCRUDTab";

const { parkingPlan, vehicleType } = InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";

const tabManagerName = instancesDescriptor[parkingPlan].plural;

export const ParkingDashboardPage = () => (
  <TabManager
    labels={[getTabName(parkingPlan), getTabName(vehicleType)]}
    title={tabManagerName}
  >
    {({ tabIndex }) => (
      <>
        {tabIndex === 0 && <ParkingPlanCRUDTab />}
        {tabIndex === 1 && <VehicleTypeCRUDTab />}
      </>
    )}
  </TabManager>
);
