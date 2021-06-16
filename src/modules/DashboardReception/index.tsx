import React from "react";
import { Drawer } from "@components/index";
import {
  SignInControlContainer,
  SignOutControlContainer,
} from "@containers/index";
import { IconList } from "@components/Drawer";
import {
  DRAWER,
  Paths,
  PERMISSION_INSTANCES,
  PERMISSION_MODULES,
} from "@utils/index";
import { Route, Switch, useHistory } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";

const DashboardReception: React.FunctionComponent = () => {
  const { push } = useHistory();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_IN,
      icon: "sign-in",
      onClick: () => push(Paths.moduleReceptionSingIn),
      show: useCheckPermissions([
        PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_IN_OTHERS,
      ]),
    },
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_OUT,
      icon: "sign-out",
      onClick: () => push(Paths.moduleReceptionSingOut),
      show: useCheckPermissions([
        PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_OUT_OTHERS,
      ]),
    },
  ];
  const hasPermission = useCheckPermissions(
    [PERMISSION_MODULES.RECEPTION],
    "all"
  );
  return (
    <Drawer
      title={DRAWER.MODULE_RECEPTION_TITLE}
      items={itemsMenu}
      canShowContent={hasPermission}
    >
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
