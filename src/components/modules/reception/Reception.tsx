import React from "react";
import { Drawer } from "@components/shared";
import { SignInControlPage } from "./SignInControlPage";
import { SignOutControlPage } from "./SignOutControlPage";
import { IconList } from "@components/shared/Drawer";
import {
  DRAWER,
  Paths,
  PERMISSION_INSTANCES,
  PERMISSION_MODULES,
} from "@utils/index";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";

const {
  moduleReception: { signIn, signOut },
} = Paths;

const Reception: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_IN,
      icon: "sign-in",
      onClick: () => navigate(signIn),
      show: useCheckPermissions([
        PERMISSION_INSTANCES.SIGN_IN_CONTROL.MADE_SIGN_IN_OTHERS,
      ]),
    },
    {
      text: DRAWER.MODULE_RECEPTION_MENU_SIGN_OUT,
      icon: "sign-out",
      onClick: () => navigate(signOut),
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
      <Routes>
        <Route path={signIn} element={<SignInControlPage />} />
        <Route path={signOut} element={<SignOutControlPage />} />
      </Routes>
    </Drawer>
  );
};

export default Reception;
