import { useMemo } from "react";
import * as yup from "yup";
import { FORM_VALIDATIONS } from "@utils/index";
import { useYupValidationResolver } from "@hooks/index";

const useFormSignInValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        password: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useFormSignInValidation;
