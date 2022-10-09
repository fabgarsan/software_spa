import React from "react";
import { TabManager } from "@components/shared";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";
import { UniqueInvoiceNumberCRUDTab } from "./UniqueInvoiceNumberCRUDTab";

const { uniqueInvoiceNumber } = InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";

const tabManagerName = instancesDescriptor[uniqueInvoiceNumber].plural;

export const ElectronicInvoiceDashboard = () => (
  <TabManager labels={[getTabName(uniqueInvoiceNumber)]} title={tabManagerName}>
    {({ tabIndex }) => <>{tabIndex === 0 && <UniqueInvoiceNumberCRUDTab />}</>}
  </TabManager>
);
