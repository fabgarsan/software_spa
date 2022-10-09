import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        dianResolutionNumber: yup
          .string()
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        prefix: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        start: yup
          .number()
          .min(1, "El número inicial debe ser mayor a 0")
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        end: yup
          .number()
          .required(FORM_VALIDATIONS.REQUIRED_FIELD)
          .moreThan(
            yup.ref("start"),
            "El número inicial debe ser mayor al final"
          ),
        currentNumber: yup
          .number()
          .min(
            yup.ref("start"),
            "El número actual debe ser mayor o igual al inicial"
          )
          .max(
            yup.ref("end"),
            "El número actual debe ser mayor o igual al final"
          )
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        authorizationDateStart: yup
          .date()
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        // authorizationDateEnd: yup.date(),
        active: yup.boolean(),
        company: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
