export const isNumber = (idField: any): idField is number => {
  return typeof idField === "number";
};

export const isString = (text: any): text is string => {
  return typeof text === "string";
};

export const setIfNotString = (text: any, newText = ""): string => {
  if (isString(text)) {
    return text;
  }
  return newText;
};

export const getFormFieldError = (value: any): string => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const setIfNotNumber = (text: any, newText = 0): number => {
  if (isNumber(text)) {
    return text;
  }
  return newText;
};
