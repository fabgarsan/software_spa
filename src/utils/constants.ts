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
  DELETE_DIALOG_TEXT: (toString: string): string =>
    `Realmente desea eliminar ${toString}`.trim(),
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

export const API_ROUTES = {
  GEOGRAPHY_CITIES: "geography-cities/",
  PERMISSION: "permissions/",
  SIGN_IN_CONTROL: "sign-in-control/",
  ESCORT_IMAGES: "escorts-images/",
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

export const PERMISSION_INSTANCES = {
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
  DATE_TIME_TO_SEND: "yyyy-MM-dd",
  DATE_TIME_TO_SHOW: "MM/dd/yyyy",
  TIME_TO_SEND: "hh:mm:ss",
  TIME_TO_SHOW: "yyyy-MM-dd",
};

//YYYY-MM-DDThh:mm:ss.uuuuuuZ

export const SYSTEM_CONFIGURATION = {
  TIMEZONE: "America/Bogota",
};
