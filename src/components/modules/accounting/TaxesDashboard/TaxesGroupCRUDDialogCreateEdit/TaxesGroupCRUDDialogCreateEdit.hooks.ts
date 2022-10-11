import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().max(150).required(FORM_VALIDATIONS.REQUIRED_FIELD),
        tax: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
