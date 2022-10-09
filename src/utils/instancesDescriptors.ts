export enum InstancesDescriptorKeys {
  escort,
  escortService,
  escortCategory,
  escortCategoryRate,
  company,
  employee,
  user,
  room,
  roomType,
  parkingPlan,
  parkingService,
  parkingPlanRate,
  vehicleType,
  pointOfSale,
  pointOfSaleWorkShift,
  printer,
  uniqueInvoiceNumber,
}

export type InstancesDescriptorValue = {
  tab?: string;
  plural: string;
  singular: string;
  permissions: {
    generic: GenericPermission;
    custom?: Record<string, string>;
  };
  apiRoute?: string;
};
const buildGenericPermissionInstanceDescriptor = (
  permission: string
): GenericPermission => ({
  LIST: `list_${permission}`,
  ADD: `add_${permission}`,
  CHANGE: `change_${permission}`,
  DELETE: `delete_${permission}`,
  VIEW: `view_${permission}`,
});
export const instancesDescriptor: Record<
  InstancesDescriptorKeys,
  InstancesDescriptorValue
> = {
  [InstancesDescriptorKeys.company]: {
    plural: "Empresas",
    singular: "Empresa",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("company"),
    },
    apiRoute: "companies/",
  },
  [InstancesDescriptorKeys.escort]: {
    plural: "Acompañantes",
    singular: "Acompañante",
    tab: "Acompañantes",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("escort"),
    },
    apiRoute: "users/",
  },
  [InstancesDescriptorKeys.escortCategory]: {
    plural: "Categorías Acompañantes",
    singular: "Categoría Acompañante",
    tab: "Categorías",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("escortcategory"),
    },
    apiRoute: "escorts-categories/",
  },
  [InstancesDescriptorKeys.escortCategoryRate]: {
    plural: "Tarifas Categoría",
    singular: "Tarifa Categoría",
    tab: "Tarifas",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("escortcategoryrate"),
    },
    apiRoute: "escorts-categories-rates/",
  },
  [InstancesDescriptorKeys.escortService]: {
    plural: "Servicios",
    singular: "Servicio",
    tab: "Servicio",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("escortservice"),
    },
    apiRoute: "escorts-services/",
  },
  [InstancesDescriptorKeys.employee]: {
    plural: "Colaboradores",
    singular: "Colaborador",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("employee"),
    },
    apiRoute: "users/",
  },
  [InstancesDescriptorKeys.user]: {
    plural: "Usuarios",
    singular: "Usuario",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("users"),
    },
    apiRoute: "users/",
  },
  [InstancesDescriptorKeys.roomType]: {
    plural: "Tipos de Habitaciones",
    singular: "Tipo Habitación",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("roomtype"),
    },
    tab: "Tipo",
    apiRoute: "rooms-types/",
  },
  [InstancesDescriptorKeys.room]: {
    plural: "Habitaciones",
    singular: "Habitación",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("room"),
    },
    tab: "Habitaciones",
    apiRoute: "rooms-rooms/",
  },
  [InstancesDescriptorKeys.parkingPlan]: {
    plural: "Planes",
    singular: "Plan",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("parkingplan"),
    },
    tab: "Planes",
    apiRoute: "parking-lot-plans/",
  },
  [InstancesDescriptorKeys.uniqueInvoiceNumber]: {
    plural: "Consecutivos",
    singular: "Consecutivo",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("uniqueinvoicenumber"),
    },
    tab: "Consecutivos",
    apiRoute: "accg-cash-flow-invoice-unique-invoice-number/",
  },
  [InstancesDescriptorKeys.parkingPlanRate]: {
    plural: "Tarifas",
    singular: "Tarifa",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("parkingrate"),
    },
    tab: "Tarifas",
    apiRoute: "parking-lot-plans-rates/",
  },
  [InstancesDescriptorKeys.vehicleType]: {
    plural: "Tipos de Vehiculos",
    singular: "Tipo de Vehiculo",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("vehicletype"),
    },
    tab: "Tipos de Vehiculos",
    apiRoute: "parking-lot-vehicles-types/",
  },
  [InstancesDescriptorKeys.pointOfSale]: {
    plural: "Puntos de Venta",
    singular: "Punto de Venta",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("pointofsale"),
    },
    apiRoute: "points-of-sales/",
  },
  [InstancesDescriptorKeys.pointOfSaleWorkShift]: {
    plural: "Turnos de Puntos de Venta",
    singular: "Turno Punto de Venta",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("pointofsaleworkshift"),
    },
    apiRoute: "points-of-sales-works-shifts/",
  },
  [InstancesDescriptorKeys.parkingService]: {
    plural: "Servicios de Parqueo",
    singular: "Servicio de Parqueo",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("parkingservice"),
    },
    apiRoute: "parking-lot-services/",
  },
  [InstancesDescriptorKeys.printer]: {
    plural: "Impresoras",
    singular: "Impresora",
    permissions: {
      generic: buildGenericPermissionInstanceDescriptor("printer"),
    },
    apiRoute: "sys-configuration-printers/",
  },
};
export type GenericPermission = {
  LIST: string;
  ADD: string;
  CHANGE: string;
  DELETE: string;
  VIEW: string;
};
