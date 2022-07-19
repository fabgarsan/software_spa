import React from "react";
import {
  CRUDAdminEscort,
  CRUDAdminEscortCategory,
  CRUDAdminEscortCategoryRate,
  CRUDAdminEscortServices,
} from "@containers/index";
import { TabManager } from "@components/index";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";

const { escort, escortCategory, escortCategoryRate, escortService } =
  InstancesDescriptorKeys;

const getTabName = (descriptorKey: InstancesDescriptorKeys) =>
  instancesDescriptor[descriptorKey]?.tab || "";
const tabManagerName = instancesDescriptor[escort].plural;

const TabManagerAdminEscort = () => {
  return (
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
          {tabIndex === 0 && <CRUDAdminEscort />}
          {tabIndex === 1 && <CRUDAdminEscortCategory />}
          {tabIndex === 2 && <CRUDAdminEscortCategoryRate />}
          {tabIndex === 3 && <CRUDAdminEscortServices />}
        </>
      )}
    </TabManager>
  );
};

export default TabManagerAdminEscort;
