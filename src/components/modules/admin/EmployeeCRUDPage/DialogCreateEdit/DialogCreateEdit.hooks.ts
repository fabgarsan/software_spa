import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        isActive: yup.boolean(),
        firstName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        gender: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        lastName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idNumber: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        bloodType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        dateOfBirth: yup.date().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
