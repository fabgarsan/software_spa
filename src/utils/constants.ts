import { LabelDisplayedRowsArgs } from "@material-ui/core";

export const ERROR_MESSAGES = {
  BASIC_ERROR: "Something went wrong.",
};

export const DIALOG_MESSAGES = {
  CRUD_CREATE_EDIT_DIALOG_TITLE: (
    instanceNameSingular: string,
    editing: boolean
  ): string => `${editing ? "Editar" : "Crear"} ${instanceNameSingular}`,
  CRUD_DELETE_DIALOG_TITLE: (instanceNameSingular: string): string =>
    `Eliminar ${instanceNameSingular}`.trim(),
  CRUD_DELETE_DIALOG_TEXT: (
    instanceNameSingular: string,
    toString: string
  ): string =>
    `Realmente desea eliminar ${instanceNameSingular} ${toString}`.trim(),
};

export const NOTIFICATION_MESSAGES = {
  SIGN_IN_SUCCESSFUL_MESSAGE: "Se ha registrado con éxito la entrada de",
  SIGN_OUT_SUCCESSFUL_MESSAGE: "Se ha registrado con éxito la salida de",
  SIGN_IN_FAILED_MESSAGE:
    "No se ha podido realizar correctamente el registro de entrada de",
  SIGN_OUT_FAILED_MESSAGE:
    "No se ha podido realizar correctamente el registro de salida de",
  CRUD_SUCCESS_ON_SAVE: (
    instanceNameSingular: string,
    toString: string
  ): string =>
    `${instanceNameSingular} ${toString} se ha creado con éxito`.trim(),
  CRUD_SUCCESS_ON_EDIT: (
    instanceNameSingular: string,
    toString: string
  ): string =>
    `${instanceNameSingular} ${toString} se ha editado con éxito`.trim(),
  CRUD_DELETE_SUCCESS: (
    instanceNameSingular: string,
    toString: string
  ): string =>
    `Se ha eliminado con correctamente ${instanceNameSingular} ${toString}`.trim(),
};

export const DRAWER = {
  MAIN_DASHBOARD_TITLE: "Principal",
  MAIN_DASHBOARD_MENU_ADMIN: "Admin",
  MODULE_RECEPTION_TITLE: "Recepción",
  MODULE_RECEPTION_MENU_SIGN_IN: "Entrada",
  MODULE_RECEPTION_MENU_SIGN_OUT: "Salida",
  MODULE_RECEPTION_MENU_LOG_BOOK: "Bitacora Entradas",
  MODULE_ADMIN_TITLE: "Admin",
  MODULE_ADMIN_MENU_ESCORTS: "Acompañantes",
  MODULE_ADMIN_MENU_EMPLOYEES: "Colaboradores",
  MODULE_ADMIN_MENU_COMPANIES: "Empresas",
  MODULE_ADMIN_MENU_USERS: "Usuarios",
  MENU_SIGN_OUT: "Cerrar Sessión",
  MENU_HOME: "Principal",
};

export const INSTANCES_NAMES = {
  ESCORT_SERVICE_SINGULAR: "Servicio Acompañante",
  ESCORT_SERVICE_PLURAL: "Servicios Acompañantes",
  ESCORT_CATEGORIES_SINGULAR: "Categoría Acompañante",
  ESCORT_CATEGORIES_PLURAL: "Categorías Acompañantes",
  ESCORT_SINGULAR: "Acompañante",
  ESCORT_PLURAL: "Acompañantes",
  EMPLOYEE_SINGULAR: "Colaborador",
  EMPLOYEE_PLURAL: "Colaboradores",
  COMPANY_PLURAL: "Empresas",
  COMPANY_SINGULAR: "Empresa",
};

export const FORM_VALIDATIONS = {
  REQUIRED_FIELD: "Campo Requerido",
  MUST_BE_AN_EMAIL_FIELD: "Debe ser un email válido",
};

export const UI = {
  BUTTON_TEXT_CREATE: "Crear",
  BUTTON_TEXT_EDIT: "Editar",
  BUTTON_TEXT_ADD: "Nuevo",
  BUTTON_TEXT_SAVE: "Guardar",
  BUTTON_TEXT_CANCEL: "Cancelar",
  BUTTON_TEXT_SEARCH: "Buscar",
  BUTTON_TEXT_ACCEPT: "Aceptar",
};

export const FORM_FIELDS = {
  GENERAL: {
    LABEL_FILTER_BY: "Filtrar por",
    LABEL_DATE: "Fecha (Mes/Día/Año)",
    LABEL_DATE_INITIAL: "Fec. Ini. (M/D/A)",
    LABEL_DATE_FINAL: "Fec. Fin. (M/D/A)",
  },
  SIGN_IN_OUT_FORM: {
    LABEL_ANSWER: "Respuesta",
  },
  ESCORT_CATEGORIES: {
    LABEL_NAME: `Nombre ${INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR}`,
    LABEL_ORDER: "Orden",
  },
  ESCORT_SERVICES: {
    LABEL_NAME: `Nombre ${INSTANCES_NAMES.ESCORT_SERVICE_SINGULAR}`,
    LABEL_NAME_EN: `Nombre ${INSTANCES_NAMES.ESCORT_SERVICE_SINGULAR} en Ingles`,
  },
  COMPANY: {
    LABEL_NAME: "Nombre",
    LABEL_NIT: "Nit",
  },
  ESCORT: {
    LABEL_ALIAS: "Nombre Artístico",
    LABEL_CATEGORY: "Categoría",
  },
  USER: {
    LABEL_FIRST_NAME: "Nombres",
    LABEL_LAST_NAME: "Apellidos",
    LABEL_EMAIL: "Email",
    LABEL_IS_ACTIVE: "Activo",
  },
  EXTENDED_USER: {
    BLOOD_TYPE: [
      { type: "NI", text: "Indefinido" },
      { type: "APOSITIVO", text: "A+" },
      { type: "ANEGATIVO", text: "A-" },
      { type: "BPOSITIVO", text: "B+" },
      { type: "BNEGATIVO", text: "B-" },
      { type: "OPOSITIVO", text: "O+" },
      { type: "ONEGATIVO", text: "O-" },
      { type: "ABPOSITIVO", text: "AB+" },
      { type: "ABNEGATIVO", text: "AB-" },
    ],
    GENDER_TYPE: [
      { type: "M", text: "Hombre" },
      { type: "F", text: "Mujer" },
    ],
    LABEL_ID_NUMBER: "Número Documento",
    LABEL_BLOOD_TYPE: "Tipo de Sangre",
    LABEL_GENDER_TYPE: "Género",
    LABEL_CITY: "Ciudad",
    LABEL_ID_TYPE: "Tipo de Documento",
    LABEL_DATE_OF_BIRTH: "Fec. Nacimiento (Mes/Día/Año)",
    LABEL_ID_TYPE_OPTIONS: {
      CC: {
        TYPE: "CC",
        TEXT: "Cédula Ciudadanía",
      },
      CE: {
        TYPE: "CE",
        TEXT: "Cédula Extrangería",
      },
      PS: {
        TYPE: "PS",
        TEXT: "Pasaporte",
      },
      NI: {
        TYPE: "NI",
        TEXT: "NIT",
      },
    },
  },
};

export const TABLE_HEADERS = {
  GENERAL: {
    HEADER_ID: "Id",
    HEADER_DELETE: "Eliminar",
    HEADER_EDIT: "Editar",
    HEADER_VIEW: "Ver",
  },
  COMPANY: {
    NAME: "Nombre",
    NIT: "Nit",
  },
  ESCORT_CATEGORIES: {
    NAME: "Nombre",
    ORDER: "Orden",
    CATEGORY: "Categoría",
  },
  ESCORT_SERVICE: {
    NAME: "Nombre",
    NAME_EN: "Nombre en Ingles",
  },
  EXTENDED_USER: {
    ALIAS: "Nombre Artístico",
  },
  USER: {
    IS_ACTIVE: "Activo",
    EMAIL: "Email",
    USERNAME: "Nombre Usuario",
  },
};

export const TABLE_PAGINATOR = {
  LIMIT: 10,
  ROWS_PER_PAGE_OPTIONS: [5, 20, 50, 100],
  LABEL_ROWS_PER_PAGE: "Filas por página",
  NEXT_ICON_BUTTON_TEXT: "Siguiente",
  BACK_ICON_BUTTON_TEXT: "Atras",
  LABEL_DISPLAYED_ROWS: (info: LabelDisplayedRowsArgs) =>
    `[${info.from} a ${info.to}] de ${info.count}, Pág. ${info.page + 1}`,
};

export const API_ROUTES = {
  GEOGRAPHY_CITIES: "geography-cities/",
  COMPANIES: "companies/",
  PERMISSION_GROUP: "groups/",
  PERMISSION: "permissions/",
  ESCORT_CATEGORY: "escorts-categories/",
  ESCORT_SERVICES: "escorts-services/",
  SIGN_IN_CONTROL: "sign-in-control/",
  ESCORT: "escorts/",
  AUTHENTICATION: "auth/",
  USER: "users/",
  USER_SIGN_IN_OUT: "users-sign-in-out/",
};

export const CONTAINERS = {
  USER_SIGN_IN_TITLE: "Registro de Entrada",
  USER_SIGN_OUT_TITLE: "Registro de Salida",
  SIGN_IN_OUT_LOG_BOOK_TITLE: "Bitacora",
  WITHOUT_ANY_PERMISSION_TO_DISPLAY: "No tienes permisos para ver",
};

export type GenericPermission = {
  LIST: string;
  ADD: string;
  CHANGE: string;
  DELETE: string;
  VIEW: string;
};

const getGenericPermissionInstance = (instance: string): GenericPermission => ({
  LIST: `list_${instance}`,
  ADD: `add_${instance}`,
  CHANGE: `change_${instance}`,
  DELETE: `delete_${instance}`,
  VIEW: `view_${instance}`,
});

export const PERMISSION_INSTANCES = {
  COMPANY: {
    GENERIC: getGenericPermissionInstance("company"),
  },
  USER: {
    GENERIC: getGenericPermissionInstance("user"),
  },
  ESCORT_CATEGORY: {
    GENERIC: getGenericPermissionInstance("escortcategory"),
  },
  ESCORT_SERVICE: {
    GENERIC: getGenericPermissionInstance("escortservice"),
  },
  EMPLOYEE: {
    GENERIC: getGenericPermissionInstance("employee"),
  },
  ESCORT: {
    GENERIC: getGenericPermissionInstance("escort"),
  },
  SIGN_IN_CONTROL: {
    MADE_SIGN_IN_OTHERS: "made_sign_in_others_signincontrol",
    MADE_SIGN_OUT_OTHERS: "made_sign_out_others_signincontrol",
    FILTER_LOG_BOOK: "filter_log_book_signincontrol",
  },
};

export const PERMISSION_MODULES = {
  ADMIN: "module_admin",
  RECEPTION: "module_reception",
};

export const FORMATS = {
  DATE_TIME_TO_SEND: "YYYY-MM-DD",
  DATE_TIME_TO_SHOW: "MM/DD/YYYY",
};
