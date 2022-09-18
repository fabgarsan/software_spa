import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        minutes: yup
          .number()
          .min(15, "Debe ser mayor o igual a 15")
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        value: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
