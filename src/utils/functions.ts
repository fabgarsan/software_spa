import { getFormFieldError } from "@utils/typeGuards";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { format } from "date-fns";

export const setFormError = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: Record<keyof T, string[]> | undefined
) => {
  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      setError(key as keyof UseFormSetError<T>, {
        type: "manual",
        message: getFormFieldError(value),
      });
    });
  }
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

export const formatIntoMoney = (value: number, currency = "COP") =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumSignificantDigits: 10,
  }).format(value);

export const removeNonAlphanumericCharactersFromString = (value: string) =>
  value.replace(/ /g, "").replace(/[^a-z0-9]/gi, "");

export const removeSpacesFromString = (value: string) =>
  value.replace(/ /g, "");

export const displayHoursAndMinutesFromMinutes = (totalMinutes: number) => {
  const minutes = Math.floor(totalMinutes % 60);
  const hours = Math.floor(totalMinutes / 60);

  return `${hours} Horas y ${minutes} Minutos`;
};

export const toHoursMinutesFormatFromDate = (datetime: Date) => {
  const dateText = datetime.toTimeString();
  return dateText.split(" ")[0].split(":").slice(0, 2).join(":");
};

export const toHumanDateTime = (datetime: Date | string) =>
  format(new Date(datetime), "LLLL dd, KK:mm:ss aaa");

export const numberFormat = (value: number): string => {
  return Intl.NumberFormat("es-CO").format(value);
};
