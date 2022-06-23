import moment from "moment";
import { getFormFieldError } from "@utils/typeGuards";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

type UnitOfTime = "years" | "months" | "hours" | "minutes";

const unitOfTimeMapper: Record<UnitOfTime, string> = {
  hours: "Horas",
  years: "Años",
  months: "Meses",
  minutes: "Minutos",
};

export const diffDates = (
  latestDate: Date,
  oldestDate: Date,
  unitOfTime: UnitOfTime
) => {
  const momentLatest = moment(latestDate);
  const momentOldest = moment(oldestDate);
  const diff = moment(momentLatest).diff(moment(momentOldest), unitOfTime);
  return `${diff} ${unitOfTimeMapper[unitOfTime]}`;
};

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
