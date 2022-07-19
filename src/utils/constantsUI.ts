import { LabelDisplayedRowsArgs } from "@mui/material";
import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";

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
    LABEL_NAME: `Nombre ${
      instancesDescriptor[InstancesDescriptorKeys.escortCategory].singular
    }`,
    LABEL_ORDER: "Orden",
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
