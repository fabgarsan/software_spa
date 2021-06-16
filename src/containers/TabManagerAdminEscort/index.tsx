import React from "react";
import { CRUDAdminEscort, CRUDAdminEscortCategory } from "@containers/index";
import { TabManager } from "@components/index";
import { INSTANCES_NAMES } from "@utils/constants";

const TabManagerAdminEscort = () => {
  return (
    <TabManager
      labels={[
        INSTANCES_NAMES.ESCORT_SINGULAR,
        INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR,
      ]}
      title={INSTANCES_NAMES.ESCORT_PLURAL}
    >
      {({ tabIndex }) => (
        <>
          {tabIndex === 0 && <CRUDAdminEscort />}
          {tabIndex === 1 && <CRUDAdminEscortCategory />}
        </>
      )}
    </TabManager>
  );
};

export default TabManagerAdminEscort;
