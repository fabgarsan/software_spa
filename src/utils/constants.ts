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
  MODULE_ADMIN_TITLE: "Admin",
  MODULE_ADMIN_MENU_CATEGORIES: "Categorías",
  MODULE_ADMIN_MENU_USERS: "Usuarios",
  MENU_SIGN_OUT: "Cerrar Sessión",
  MENU_HOME: "Principal",
};

export const INSTANCES_NAMES = {
  ESCORT_CATEGORIES_SINGULAR: "Categoría Acompañante",
  ESCORT_CATEGORIES_PLURAL: "Categorías Acompañantes",
};

export const FORM_VALIDATIONS = {
  REQUIRED_FIELD: "Campo Requerido",
};

export const UI = {
  BUTTON_TEXT_CREATE: "Crear",
  BUTTON_TEXT_EDIT: "Editar",
  BUTTON_TEXT_ADD: "Nuevo",
  BUTTON_TEXT_SAVE: "Guardar",
  BUTTON_TEXT_CANCEL: "Cancelar",
};

export const FORM_FIELDS = {
  ESCORT_CATEGORIES: {
    LABEL_NAME: `Nombre ${INSTANCES_NAMES.ESCORT_CATEGORIES_SINGULAR}`,
    LABEL_ORDER: "Orden",
  },
};

export const TABLE_HEADERS = {
  GENERAL: {
    HEADER_ID: "Id",
    HEADER_DELETE: "Eliminar",
    HEADER_EDIT: "Editar",
  },
  ESCORT_CATEGORIES: {
    NAME: `Nombre`,
    ORDER: "Orden",
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
