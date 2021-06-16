import React from "react";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths, DRAWER, PERMISSION_MODULES } from "@utils/index";
import { useHistory } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";

const DashboardRoot: React.FunctionComponent = () => {
  const { push } = useHistory();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MAIN_DASHBOARD_MENU_ADMIN,
      icon: "cogs",
      onClick: () => push(Paths.moduleAdmin),
      show: useCheckPermissions([PERMISSION_MODULES.ADMIN], "all"),
    },
    {
      text: DRAWER.MODULE_RECEPTION_TITLE,
      icon: "door-open",
      onClick: () => push(Paths.moduleReception),
      show: useCheckPermissions([PERMISSION_MODULES.RECEPTION], "all"),
    },
  ];
  return (
    <Drawer
      canShowContent
      title={DRAWER.MAIN_DASHBOARD_TITLE}
      items={itemsMenu}
      withMainIcon={false}
    >
      <div>This is the root</div>
    </Drawer>
  );
};

export default DashboardRoot;
