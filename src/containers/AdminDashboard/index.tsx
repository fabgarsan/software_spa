import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths } from "@utils/index";
import { AdminUserCRUD, AdminCategoryCRUD } from "@containers/index";

const AdminDashboard: React.FunctionComponent = () => {
  const { push } = useHistory();

  const itemsMenu: IconList[] = [
    { text: "Usuarios", icon: "users", onClick: () => push(Paths.adminUsers) },
    {
      text: "Categorías",
      icon: "user-nurse",
      onClick: () => push(Paths.adminCategories),
    },
  ];

  return (
    <Drawer title="Admin" items={itemsMenu}>
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
