import { useMemo } from "react";
import * as yup from "yup";
import { FORM_VALIDATIONS } from "@utils/constantsUI";
import { useYupValidationResolver } from "@hooks/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        host: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
