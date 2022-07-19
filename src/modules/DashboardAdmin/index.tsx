import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import {
  Paths,
  DRAWER,
  PERMISSION_MODULES,
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/index";
import {
  CRUDAdminCompany,
  CRUDAdminEmployee,
  CRUDAdminUser,
  TabManagerAdminEscort,
  DetailViewEscort,
} from "@containers/index";
import {
  useCheckGenericUserPermissions,
  useCheckPermissions,
} from "@hooks/index";

const instanceDescriptorUser =
  instancesDescriptor[InstancesDescriptorKeys.users];

const instanceDescriptorEscortCategory =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

const instanceDescriptorEmployee =
  instancesDescriptor[InstancesDescriptorKeys.employee];

const instanceDescriptorCompany =
  instancesDescriptor[InstancesDescriptorKeys.company];

const DashboardAdmin: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => navigate(Paths.moduleAdminUsers),
      show: useCheckGenericUserPermissions(
        instanceDescriptorUser.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => navigate(Paths.moduleAdminEscorts),
      show: useCheckGenericUserPermissions(
        instanceDescriptorEscortCategory.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => navigate(Paths.moduleAdminEmployees),
      show: useCheckGenericUserPermissions(
        instanceDescriptorEmployee.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_COMPANIES,
      icon: "building",
      onClick: () => navigate(Paths.moduleAdminCompanies),
      show: useCheckGenericUserPermissions(
        instanceDescriptorCompany.permissions.generic
      ).HAS_ANY,
    },
  ];

  const hasPermission = useCheckPermissions([PERMISSION_MODULES.ADMIN], "all");
  return (
    <Drawer
      title={DRAWER.MODULE_ADMIN_TITLE}
      items={itemsMenu}
      canShowContent={hasPermission}
    >
      <Routes>
        <Route path={Paths.moduleAdminUsers} element={<CRUDAdminUser />} />
        <Route
          path={Paths.moduleAdminEmployees}
          element={<CRUDAdminEmployee />}
        />
        <Route path={Paths.moduleAdminEscorts}>
          <Route path={":id"} element={<DetailViewEscort />} />
          <Route index element={<TabManagerAdminEscort />} />
        </Route>
        <Route
          path={Paths.moduleAdminCompanies}
          element={<CRUDAdminCompany />}
        />
      </Routes>
    </Drawer>
  );
};

export default DashboardAdmin;
