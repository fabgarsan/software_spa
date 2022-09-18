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
import { RoomDashboardPage } from "./RoomDashboardPage";
import { EscortDetailViewPage } from "./EscortDetailViewPage";
import { ParkingPlanDetailViewPage } from "./ParkingPlanDetailViewPage";
import { ParkingDashboardPage } from "./ParkingDashboardPage";
import {
  useCheckGenericUserPermissions,
  useCheckPermissions,
} from "@hooks/index";

const instanceDescriptorUser =
  instancesDescriptor[InstancesDescriptorKeys.user];

const instanceDescriptorRoom =
  instancesDescriptor[InstancesDescriptorKeys.room];

const instanceDescriptorEscortCategory =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

const instanceDescriptorEmployee =
  instancesDescriptor[InstancesDescriptorKeys.employee];

const instanceDescriptorCompany =
  instancesDescriptor[InstancesDescriptorKeys.company];

const instanceDescriptorParking =
  instancesDescriptor[InstancesDescriptorKeys.parkingPlan];

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
    {
      text: DRAWER.MODULE_ADMIN_MENU_PARKING,
      icon: "car",
      onClick: () => navigate(Paths.moduleAdminParking),
      show: useCheckGenericUserPermissions(
        instanceDescriptorParking.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ROOM,
      icon: "bed",
      onClick: () => navigate(Paths.moduleAdminRoom),
      show: useCheckGenericUserPermissions(
        instanceDescriptorRoom.permissions.generic
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
        <Route path={Paths.moduleAdminParking}>
          <Route path={":id"} element={<ParkingPlanDetailViewPage />} />
          <Route index element={<ParkingDashboardPage />} />
        </Route>
        <Route
          path={Paths.moduleAdminCompanies}
          element={<CompanyCRUDPage />}
        />
        <Route path={Paths.moduleAdminRoom} element={<RoomDashboardPage />} />
      </Routes>
    </Drawer>
  );
};

//ParkingPlanViewPage

export default Admin;
