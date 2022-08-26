import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Drawer } from "@components/shared";
import { IconList } from "@components/shared/Drawer";
import {
  Paths,
  DRAWER,
  PERMISSION_MODULES,
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/index";
import { CompanyCRUDPage } from "./CompanyCRUDPage";
import { EmployeeCRUDPage } from "./EmployeeCRUDPage";
import { UserCRUDPage } from "./UserCRUDPage";
import { EscortDashboardPage } from "./EscortDashboardPage";
import { EscortDetailViewPage } from "./EscortDetailViewPage";
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

const Admin: React.FunctionComponent = () => {
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
        <Route path={Paths.moduleAdminUsers} element={<UserCRUDPage />} />
        <Route
          path={Paths.moduleAdminEmployees}
          element={<EmployeeCRUDPage />}
        />
        <Route path={Paths.moduleAdminEscorts}>
          <Route path={":id"} element={<EscortDetailViewPage />} />
          <Route index element={<EscortDashboardPage />} />
        </Route>
        <Route
          path={Paths.moduleAdminCompanies}
          element={<CompanyCRUDPage />}
        />
      </Routes>
    </Drawer>
  );
};

export default Admin;
