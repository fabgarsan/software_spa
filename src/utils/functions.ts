import { getFormFieldError } from "@utils/typeGuards";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

export const setFormError = <T>(
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

export const setFormValue = <T>(setValue: UseFormSetValue<T>, instance: T) => {
  Object.entries(instance).forEach(([key, value]) => {
    setValue(key as keyof UseFormSetValue<T>, value);
  });
};
