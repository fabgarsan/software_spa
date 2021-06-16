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

const DashboardAdmin: React.FunctionComponent = () => {
  const { push } = useHistory();

  console.log(PERMISSION_INSTANCES.ESCORT_CATEGORY);

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => push(Paths.moduleAdminUsers),
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => push(Paths.moduleAdminEscorts),
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => push(Paths.moduleAdminEmployees),
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
