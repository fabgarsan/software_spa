import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        alias: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        firstName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        lastName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idNumber: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        category: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        email: yup
          .string()
          .email(FORM_VALIDATIONS.MUST_BE_AN_EMAIL_FIELD)
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useValidation;
