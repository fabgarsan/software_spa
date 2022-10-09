import { LabelDisplayedRowsArgs } from "@mui/material";
import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";

export const DRAWER = {
  MAIN_DASHBOARD_TITLE: "Principal",
  MAIN_DASHBOARD_MENU_ADMIN: "Admin",
  MODULE_RECEPTION_TITLE: "Recepción",
  MODULE_ACCOUNTING_TITLE: "Contabilidad",
  MODULE_ACCOUNTING_ELECTRONIC_INVOICE_TITLE: "Facturación",
  MODULE_REPORTS_TITLE: "Reportes",
  MODULE_REPORTS_PARKING_SERVICE_HISTORY: "Historico",
  MODULE_POINT_OF_SALE_TITLE: "Punto de Venta",
  MODULE_PARKING_LOT_TITLE: "Parqueadero",
  MODULE_RECEPTION_SIGN_IN_OUT_LOG: "Bitacora Entradas",
  MODULE_RECEPTION_MENU_SIGN_IN: "Entrada",
  MODULE_RECEPTION_MENU_SIGN_OUT: "Salida",
  MODULE_ADMIN_TITLE: "Admin",
  MODULE_MY_ACCOUNT_TITLE: "Mi Cuenta",
  MODULE_ADMIN_MENU_ESCORTS: "Acompañantes",
  MODULE_ADMIN_MENU_EMPLOYEES: "Colaboradores",
  MODULE_ADMIN_MENU_COMPANIES: "Empresas",
  MODULE_ADMIN_MENU_PARKING: "Parqueadero",
  MODULE_ADMIN_MENU_ROOM: "Habitaciones",
  MODULE_ADMIN_MENU_USERS: "Usuarios",
  MODULE_ADMIN_MENU_POINTS_OF_SALE: "Puntos de Venta",
  MODULE_ADMIN_PRINTER: "Impresoras",
  MENU_SIGN_OUT: "Cerrar Sessión",
  MENU_HOME: "Principal",
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
  BUTTON_TEXT_START: "Iniciar",
  BUTTON_TEXT_CANCEL: "Cancelar",
  BUTTON_TEXT_SEARCH: "Buscar",
  BUTTON_TEXT_ACCEPT: "Aceptar",
  BUTTON_TEXT_PAY: "Pagar",
  BUTTON_TEXT_PRINT: "Imprimir",
  BUTTON_REGISTER_SIGN_OUT: "Registrar Salida",
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
    LABEL_NAME: `Nombre ${
      instancesDescriptor[InstancesDescriptorKeys.escortCategory].singular
    }`,
    LABEL_ORDER: "Orden",
  },
  ROOM: {
    LABEL_NUMBER: "Número",
    LABEL_IS_ACTIVE: "Activa",
    LABEL_ROOM_TYPE: "Tipo",
    LABEL_COMPANY: "Empresa",
  },
  ROOM_TYPE: {
    LABEL_NAME: `Nombre ${
      instancesDescriptor[InstancesDescriptorKeys.roomType].singular
    }`,
    LABEL_VALUE: "Valor",
  },
  ESCORT_CATEGORIES_RATES: {
    LABEL_VALUE: "Valor",
    LABEL_MINUTES: "Minutos",
    LABEL_CATEGORY: "Categoría",
    LABEL_PUBLISHED_WEB: "Publicar en la página",
  },
  PRINTERS: {
    LABEL_NAME: "Nombre",
    LABEL_BRAND: "Marca",
    LABEL_MODEL: "Modelo",
    LABEL_IP_ADDRESS: "Dirección Ip",
    LABEL_IS_ACTIVE: "Activa",
  },
  ESCORT_SERVICES: {
    LABEL_NAME: `Nombre ${
      instancesDescriptor[InstancesDescriptorKeys.escortService].singular
    }`,
    LABEL_NAME_EN: `Nombre ${
      instancesDescriptor[InstancesDescriptorKeys.escortService].singular
    } en Ingles`,
  },
  COMPANY: {
    LABEL_NAME: "Nombre",
    LABEL_NIT: "Nit",
  },
  POINT_OF_SALE: {
    LABEL_NAME: "Nombre",
    LABEL_IS_ACTIVE: "Esta activo?",
    LABEL_HAS_INCOME_OPERATIONS: "Hace operaciones de ingreso de dinero?",
    LABEL_HAS_OUTCOME_OPERATIONS: "Hace operaciones de salida de dinero?",
    LABEL_HAS_PARKING_LOT: "Vende servicios de parqueadero?",
    LABEL_HAS_ESCORT_SERVICES: "Vende servicios de habitaciones?",
    LABEL_PRINTER: "Impresora",
    LABEL_UNIQUE_INVOICE_NUMBER: "Resolución Facturación",
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
  PARKING_PLAN: {
    LABEL_NAME: "Nombres",
    LABEL_TIME_FROM: "Hora de Inicio",
    LABEL_TIME_TO: "Hora de Cierre",
    LABEL_VEHICLE_TYPE: "Típo de Vehículo",
    LABEL_MONDAY: "Lúnes",
    LABEL_TUESDAY: "Mártes",
    LABEL_WEDNESDAY: "Miércoles",
    LABEL_THURSDAY: "Jueves",
    LABEL_FRIDAY: "Viernes",
    LABEL_SATURDAY: "Sábado",
    LABEL_SUNDAY: "Domingo",
  },
  PARKING_RATE: {
    LABEL_MINUTES: "Minutos",
    LABEL_VALUE: "Valor",
  },
  VEHICLE_TYPE: {
    LABEL_NAME: "Nombres",
    LABEL_HAS_LICENSE_PLATE: "Tiene Placa?",
  },
  UNIQUE_INVOICE_NUMBER: {
    LABEL_DIAN_RESOLUTION_NUMBER: "Número Resolución DIAN",
    LABEL_START: "Número Inicial",
    LABEL_END: "Número Final",
    LABEL_CURRENT_NUMBER: "Número Actual",
    LABEL_START_DATE: "Fecha Autorización",
    LABEL_END_DATE: "Fecha de Finalización",
    LABEL_PREFIX: "Prefijo",
    LABEL_IS_ACTIVE: "Activo",
    LABEL_COMPANY: "Empresa",
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
  ROOM_TYPE: {
    NAME: "Nombre",
    VALUE: "Valor",
  },
  ROOM: {
    NUMBER: "Número",
    IS_ACTIVE: "Activa",
    STATUS: "Estado",
    COMPANY: "Empresa",
    TYPE: "Tipo",
  },
  ESCORT_CATEGORIES_RATES: {
    NAME: "Nombre",
    CATEGORY_NAME: "Categoría",
    MINUTES: "Minutos",
    VALUE: "Valor",
    PUBLISHED_WEB: "En Página Web",
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
  PARKING_PLAN: {
    NAME: "Nombre",
    VEHICLE_TYPE: "Tipo de Vehículo",
    TIME_FROM: "Hora de Inicio",
    TIME_TO: "Hora Fin",
    MONDAY: "LUN",
    TUESDAY: "MAR",
    WEDNESDAY: "MIE",
    THURSDAY: "JUE",
    FRIDAY: "VIE",
    SATURDAY: "SAB",
    SUNDAY: "DOM",
  },
  PARKING_RATE: {
    MINUTES: "Minutos",
    VALUE: "Valor",
  },
  VEHICLE_TYPE: {
    NAME: "Nombre",
    HAS_LICENSE_PLATE: "Tiene Placa?",
  },
  UNIQUE_INVOICE_NUMBER: {
    RESOLUTION: "Resolución DIAN",
    IS_ACTIVE: "Esta Activo?",
    PREFIX: "Prefijo",
    START: "Número Inicio",
    END: "Número Final",
    START_DATE: "Fecha de Autorización",
    END_DATE: "Fecha de Vigencia",
    CURRENT_NUMBER: "Número Actual",
  },
  POINT_OF_SALE: {
    NAME: "Nombre",
    IS_ACTIVE: "Esta Activo?",
    HAS_INCOME_OPERATIONS: "Ope. Ingreso",
    HAS_OUTCOME_OPERATIONS: "Ope. Egreso",
    HAS_PARKING_LOT: "Parqueadero",
    HAS_ESCORT_SERVICES: "Habitaciones",
  },
  PRINTER: {
    NAME: "Nombre",
    BRAND: "Marca",
    MODEL: "Modelo",
    IP_ADDRESS: "Ip",
    IS_ACTIVE: "Activa",
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
