import React from "react";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths } from "@utils/index";
import { useHistory } from "react-router-dom";

const Root: React.FunctionComponent = () => {
  const { push } = useHistory();
  const itemsMenu: IconList[] = [
    { text: "Admin", icon: "cogs", onClick: () => push(Paths.adminModule) },
  ];
  return (
    <Drawer title="Principal" items={itemsMenu}>
      <div>This is the root</div>
    </Drawer>
  );
};

export default Root;
