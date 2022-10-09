import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchPrinters } from "@api/sysConfiguration";
import { Printer } from "@dto/sysConfiguration";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        printer: yup
          .number()
          .nullable(true)
          .transform((val, _) => (Number(val) ? val : null)),
        active: yup.boolean(),
        hasIncomeOperations: yup.boolean(),
        hasOutcomesOperations: yup.boolean(),
        hasParkingLotServicesSales: yup.boolean(),
        hasEscortServicesSales: yup.boolean(),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const usePrintersQuery = () => {
  return useQuery<Printer[], AxiosError>(
    ["printers"],
    () => fetchPrinters().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};
