import React from "react";
import { AdminCRUDEscort, AdminCRUDEscortCategory } from "@containers/index";
import { TabManager } from "@components/index";
import { INSTANCES_NAMES } from "@utils/constants";

const AdminTabManagerEscort = () => {
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
          {tabIndex === 0 && <AdminCRUDEscort />}
          {tabIndex === 1 && <AdminCRUDEscortCategory />}
        </>
      )}
    </TabManager>
  );
};

export default AdminTabManagerEscort;
