import React from "react";
import { Drawer } from "@components/index";
import {
  SignInControlContainer,
  SignOutControlContainer,
} from "@containers/index";
import { IconList } from "@components/Drawer";
import { DRAWER, Paths } from "@utils/index";
import { Route, Switch, useHistory } from "react-router-dom";

const DashboardReception: React.FunctionComponent = () => {
  const { push } = useHistory();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_IN,
      icon: "sign-in",
      onClick: () => push(Paths.moduleReceptionSingIn),
    },
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_OUT,
      icon: "sign-out",
      onClick: () => push(Paths.moduleReceptionSingOut),
    },
  ];

  return (
    <Drawer title={DRAWER.MODULE_RECEPTION_TITLE} items={itemsMenu}>
      <Switch>
        <Route
          exact
          path={Paths.moduleReceptionSingIn}
          component={SignInControlContainer}
        />
        <Route
          exact
          path={Paths.moduleReceptionSingOut}
          component={SignOutControlContainer}
        />
      </Switch>
    </Drawer>
  );
};

export default DashboardReception;
