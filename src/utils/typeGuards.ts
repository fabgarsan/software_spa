import { ExtendedUser } from "@dto/users";
import { Escort } from "@dto/escorts";

export const isDate = (idField: unknown): idField is Date => {
  return (
    idField instanceof Date ||
    (typeof idField === "object" &&
      Object.prototype.toString.call(idField) === "[object Date]")
  );
};

export const isBoolean = (idField: unknown): idField is boolean =>
  typeof idField === "boolean";

export const isNumber = (idField: unknown): idField is number =>
  typeof idField === "number";

export const isString = (text: unknown): text is string =>
  typeof text === "string";

export const setIfNotString = (text: unknown, newText = ""): string =>
  (isString(text) && text) || newText;

export const getFormFieldError = (value: unknown): string =>
  (Array.isArray(value) && value[0]) || value;

export const setIfNotNumber = (text: unknown, newText = 0): number =>
  (isNumber(text) && text) || newText;

export const isEscort = (user: ExtendedUser | Escort): user is Escort =>
  (user as Escort).categoryName !== undefined;
