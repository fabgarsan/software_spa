import React from "react";
import {
  CRUDAdminEscort,
  CRUDAdminEscortCategory,
  CRUDAdminEscortServices,
} from "@containers/index";
import { TabManager } from "@components/index";
import { INSTANCES_NAMES } from "@utils/constants";

const TabManagerAdminEscort = () => {
  return (
    <TabManager
      labels={[
        INSTANCES_NAMES.ESCORT_SINGULAR,
        INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR,
        INSTANCES_NAMES.ESCORT_SERVICE_SINGULAR,
      ]}
      title={INSTANCES_NAMES.ESCORT_PLURAL}
    >
      {({ tabIndex }) => (
        <>
          {tabIndex === 0 && <CRUDAdminEscort />}
          {tabIndex === 1 && <CRUDAdminEscortCategory />}
          {tabIndex === 2 && <CRUDAdminEscortServices />}
        </>
      )}
    </TabManager>
  );
};

export default TabManagerAdminEscort;
