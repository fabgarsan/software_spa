import React from "react";
import { TabManager } from "@components/shared";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";
import { TaxesCRUDTab } from "./TaxesCRUDTab";
import { TaxesGroupCRUDTab } from "./TaxesGroupCRUDTab";

const { tax, taxGroup } = InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";

const tabManagerName = instancesDescriptor[tax].plural;

export const TaxesDashboard = () => (
  <TabManager
    labels={[getTabName(tax), getTabName(taxGroup)]}
    title={tabManagerName}
  >
    {({ tabIndex }) => (
      <>
        {tabIndex === 0 && <TaxesCRUDTab />}
        {tabIndex === 1 && <TaxesGroupCRUDTab />}
      </>
    )}
  </TabManager>
);
