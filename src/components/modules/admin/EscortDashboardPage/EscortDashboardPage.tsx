import React from "react";
import { EscortCRUDTab } from "./EscortCRUDTab";
import { EscortCategoryCRUDTab } from "./EscortCategoryCRUDTab";
import { EscortCategoryRateCRUDTab } from "./EscortCategoryRateCRUDTab";
import { EscortServiceCRUDTab } from "./EscortServiceCRUDTab";
import { TabManager } from "@components/shared";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

const { escort, escortCategory, escortCategoryRate, escortService } =
  InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";
const tabManagerName = instancesDescriptor[escort].plural;

export const EscortDashboardPage = () => (
  <TabManager
    labels={[
      getTabName(escort),
      getTabName(escortCategory),
      getTabName(escortCategoryRate),
      getTabName(escortService),
    ]}
    title={tabManagerName}
  >
    {({ tabIndex }) => (
      <>
        {tabIndex === 0 && <EscortCRUDTab />}
        {tabIndex === 1 && <EscortCategoryCRUDTab />}
        {tabIndex === 2 && <EscortCategoryRateCRUDTab />}
        {tabIndex === 3 && <EscortServiceCRUDTab />}
      </>
    )}
  </TabManager>
);
