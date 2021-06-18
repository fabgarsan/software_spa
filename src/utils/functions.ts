import moment from "moment";
import { getFormFieldError } from "@utils/typeGuards";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

type UnitOfTime = "years" | "months" | "hours" | "minutes";

export const diffDates = (
  latestDate: Date,
  oldestDate: Date,
  unitOfTime: UnitOfTime
) => {
  const momentLatest = moment(latestDate);
  const momentOldest = moment(oldestDate);
  const diff = moment(momentLatest).diff(moment(momentOldest), unitOfTime);
  let unitOfTimeText = "";
  switch (unitOfTime) {
    case "years":
      unitOfTimeText = "Años";
      break;
    case "months":
      unitOfTimeText = "Meses";
      break;
    case "hours":
      unitOfTimeText = "Horas";
      break;
    case "minutes":
      unitOfTimeText = "Minutos";
      break;
    default:
      unitOfTimeText = "Horas";
  }
  return `${diff} ${unitOfTimeText}`;
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
    // @ts-ignore
    setValue(key as keyof UseFormSetValue<T>, value);
  });
};
