import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        nit: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useValidation;
