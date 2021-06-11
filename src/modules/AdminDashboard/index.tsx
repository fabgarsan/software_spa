import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths, DRAWER } from "@utils/index";
import { AdminUserCRUD, AdminCategoryCRUD } from "@containers/index";

const AdminDashboard: React.FunctionComponent = () => {
  const { push } = useHistory();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => push(Paths.adminUsers),
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_CATEGORIES,
      icon: "user-nurse",
      onClick: () => push(Paths.adminCategories),
    },
  ];

  return (
    <Drawer title={DRAWER.MODULE_ADMIN_TITLE} items={itemsMenu}>
      <Switch>
        <Route exact path={Paths.adminUsers} component={AdminUserCRUD} />
        <Route
          exact
          path={Paths.adminCategories}
          component={AdminCategoryCRUD}
        />
      </Switch>
    </Drawer>
  );
};

export default AdminDashboard;
