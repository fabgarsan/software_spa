import React from "react";
import {useHistory} from "react-router-dom";
import {Drawer} from "@components/index";
import {IconList} from "@components/Drawer";
import {Paths} from "@utils/index";

const AdminDashboard = () => {
  const {push} = useHistory();
  const itemsMenu: IconList[] = [
    {text: 'Admin', icon: 'cogs', onClick: () => push(Paths.adminModule)}
  ];
  return <Drawer title='Admin' items={itemsMenu}>
    <div>This is the admin</div>
  </Drawer>
};

export default AdminDashboard;