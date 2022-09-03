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
  instance: T,
  yupFields?: string[]
) => {
  Object.entries(instance).forEach(([key, value]) => {
    if (yupFields) {
      if (yupFields.includes(key))
        setValue(key as keyof UseFormSetValue<T>, value);
    } else {
      setValue(key as keyof UseFormSetValue<T>, value);
    }
  });
};

export const formatIntoMoney = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumSignificantDigits: 10,
  }).format(value);
