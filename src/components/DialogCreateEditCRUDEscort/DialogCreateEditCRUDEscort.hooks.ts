import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { differenceInYears } from "date-fns";

const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        lastName: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idNumber: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        idType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        city: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        bloodType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        dateOfBirth: yup
          .date()
          .required(FORM_VALIDATIONS.REQUIRED_FIELD)
          .test("Validación de Edad", "Debe ser mayor de edad", (value) => {
            if (!value) return true;
            return differenceInYears(new Date(), value) >= 18;
          }),
        alias: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        category: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useValidation;
