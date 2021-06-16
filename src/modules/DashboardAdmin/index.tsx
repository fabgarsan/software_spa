import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths, DRAWER, PERMISSION_INSTANCES } from "@utils/index";
import {
  CRUDAdminEmployee,
  CRUDAdminUser,
  TabManagerAdminEscort,
} from "@containers/index";
import { useCheckGenericUserPermissions } from "@hooks/index";

const DashboardAdmin: React.FunctionComponent = () => {
  const { push } = useHistory();
  const permissionsEscortCategory = useCheckGenericUserPermissions(
    PERMISSION_INSTANCES.ESCORT_CATEGORY.GENERIC
  );

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => push(Paths.moduleAdminUsers),
      show: true,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => push(Paths.moduleAdminEscorts),
      show: permissionsEscortCategory.HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => push(Paths.moduleAdminEmployees),
      show: true,
    },
  ];

  return (
    <Drawer title={DRAWER.MODULE_ADMIN_TITLE} items={itemsMenu}>
      <Switch>
        <Route exact path={Paths.moduleAdminUsers} component={CRUDAdminUser} />
        <Route
          exact
          path={Paths.moduleAdminEmployees}
          component={CRUDAdminEmployee}
        />
        <Route
          exact
          path={Paths.moduleAdminEscorts}
          component={TabManagerAdminEscort}
        />
      </Switch>
    </Drawer>
  );
};

export default DashboardAdmin;
