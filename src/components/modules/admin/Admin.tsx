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
import { PointOfSaleCRUDPage } from "./PointOfSaleCRUDPage";
import { PointOfSaleDetailViewPage } from "./PointOfSaleDetailViewPage";
import { EscortDashboardPage } from "./EscortDashboardPage";
import { RoomDashboardPage } from "./RoomDashboardPage";
import { EscortDetailViewPage } from "./EscortDetailViewPage";
import { ParkingPlanDetailViewPage } from "./ParkingPlanDetailViewPage";
import { ParkingDashboardPage } from "./ParkingDashboardPage";
import { PrinterCRUDPage } from "./PrinterCRUDPage";
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

const instanceDescriptorPointOfSale =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

const instanceDescriptorPrinter =
  instancesDescriptor[InstancesDescriptorKeys.printer];

const {
  moduleAdmin: {
    employees,
    escorts,
    companies,
    room,
    parking,
    pointOfSale,
    users,
    printer,
  },
} = Paths;

const Admin: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ADMIN_MENU_USERS,
      icon: "users",
      onClick: () => navigate(users),
      show: useCheckGenericUserPermissions(
        instanceDescriptorUser.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ESCORTS,
      icon: "user-nurse",
      onClick: () => navigate(escorts),
      show: useCheckGenericUserPermissions(
        instanceDescriptorEscortCategory.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_EMPLOYEES,
      icon: "user-hard-hat",
      onClick: () => navigate(employees),
      show: useCheckGenericUserPermissions(
        instanceDescriptorEmployee.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_COMPANIES,
      icon: "building",
      onClick: () => navigate(companies),
      show: useCheckGenericUserPermissions(
        instanceDescriptorCompany.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_PARKING,
      icon: "car",
      onClick: () => navigate(parking),
      show: useCheckGenericUserPermissions(
        instanceDescriptorParking.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_ROOM,
      icon: "bed",
      onClick: () => navigate(room),
      show: useCheckGenericUserPermissions(
        instanceDescriptorRoom.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_MENU_POINTS_OF_SALE,
      icon: "cash-register",
      onClick: () => navigate(pointOfSale),
      show: useCheckGenericUserPermissions(
        instanceDescriptorPointOfSale.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ADMIN_PRINTER,
      icon: "print",
      onClick: () => navigate(printer),
      show: useCheckGenericUserPermissions(
        instanceDescriptorPrinter.permissions.generic
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
        <Route path={users} element={<UserCRUDPage />} />
        <Route path={employees} element={<EmployeeCRUDPage />} />
        <Route path={escorts}>
          <Route path={":id"} element={<EscortDetailViewPage />} />
          <Route index element={<EscortDashboardPage />} />
        </Route>
        <Route path={parking}>
          <Route path={":id"} element={<ParkingPlanDetailViewPage />} />
          <Route index element={<ParkingDashboardPage />} />
        </Route>
        <Route path={pointOfSale}>
          <Route path={":id"} element={<PointOfSaleDetailViewPage />} />
          <Route index element={<PointOfSaleCRUDPage />} />
        </Route>
        <Route path={companies} element={<CompanyCRUDPage />} />
        <Route path={room} element={<RoomDashboardPage />} />
        <Route path={printer} element={<PrinterCRUDPage />} />
      </Routes>
    </Drawer>
  );
};

export default Admin;
