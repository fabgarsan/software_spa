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
  parkingPlanRate,
  vehicleType,
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
  instance: string
): GenericPermission => ({
  LIST: `list_${instance}`,
  ADD: `add_${instance}`,
  CHANGE: `change_${instance}`,
  DELETE: `delete_${instance}`,
  VIEW: `view_${instance}`,
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
};
export type GenericPermission = {
  LIST: string;
  ADD: string;
  CHANGE: string;
  DELETE: string;
  VIEW: string;
};
