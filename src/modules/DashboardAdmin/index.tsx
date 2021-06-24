import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
} from "@containers/index";
import {
  useCheckGenericUserPermissions,
  useCheckPermissions,
} from "@hooks/index";

const DashboardAdmin: React.FunctionComponent = () => {
  const { push } = useHistory();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => push(Paths.moduleAdminUsers),
      show: useCheckGenericUserPermissions(PERMISSION_INSTANCES.USER.GENERIC)
        .HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => push(Paths.moduleAdminEscorts),
      show: useCheckGenericUserPermissions(
        PERMISSION_INSTANCES.ESCORT_CATEGORY.GENERIC
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => push(Paths.moduleAdminEmployees),
      show: useCheckGenericUserPermissions(
        PERMISSION_INSTANCES.EMPLOYEE.GENERIC
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_COMPANIES,
      icon: "building",
      onClick: () => push(Paths.moduleAdminCompanies),
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
      <Switch>
        <Route exact path={Paths.moduleAdminUsers} component={CRUDAdminUser} />
        <Route
          exact
          path={Paths.moduleAdminEmployees}
          component={CRUDAdminEmployee}
        />
        <Route
          exact
          path={Paths.moduleAdminEscorts}
          component={TabManagerAdminEscort}
        />
        <Route
          exact
          path={Paths.moduleAdminCompanies}
          component={CRUDAdminCompany}
        />
      </Switch>
    </Drawer>
  );
};

export default DashboardAdmin;
