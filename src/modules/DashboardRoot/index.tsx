import React from "react";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths, DRAWER } from "@utils/index";
import { useHistory } from "react-router-dom";

const DashboardRoot: React.FunctionComponent = () => {
  const { push } = useHistory();
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MAIN_DASHBOARD_MENU_ADMIN,
      icon: "cogs",
      onClick: () => push(Paths.moduleAdmin),
    },
    {
      text: DRAWER.MODULE_RECEPTION_TITLE,
      icon: "door-open",
      onClick: () => push(Paths.moduleReception),
    },
  ];
  return (
    <Drawer
      title={DRAWER.MAIN_DASHBOARD_TITLE}
      items={itemsMenu}
      withMainIcon={false}
    >
      <div>This is the root</div>
    </Drawer>
  );
};

export default DashboardRoot;
