import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import {
  Paths,
  DRAWER,
  PERMISSION_INSTANCES,
  PERMISSION_MODULES,
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

const DashboardAdmin: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => navigate(Paths.moduleAdminUsers),
      show: useCheckGenericUserPermissions(PERMISSION_INSTANCES.USER.GENERIC)
        .HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => navigate(Paths.moduleAdminEscorts),
      show: useCheckGenericUserPermissions(
        PERMISSION_INSTANCES.ESCORT_CATEGORY.GENERIC
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => navigate(Paths.moduleAdminEmployees),
      show: useCheckGenericUserPermissions(
        PERMISSION_INSTANCES.EMPLOYEE.GENERIC
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_COMPANIES,
      icon: "building",
      onClick: () => navigate(Paths.moduleAdminCompanies),
      show: useCheckGenericUserPermissions(PERMISSION_INSTANCES.COMPANY.GENERIC)
        .HAS_ANY,
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
