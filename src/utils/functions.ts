import { getFormFieldError } from "@utils/typeGuards";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

export const setFormError = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: { [name: string]: string[] }
) => {
  Object.entries(errors).forEach(([key, value]) => {
    setError(key as keyof UseFormSetError<T>, {
      type: "manual",
      message: getFormFieldError(value),
    });
  });
};

export const setFormValue = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  instance: T
) => {
  Object.entries(instance).forEach(([key, value]) => {
    setValue(key as keyof UseFormSetValue<T>, value);
  });
};
