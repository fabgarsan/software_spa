import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { TAX_TYPE } from "@dto/accountingTaxes";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().max(150).required(FORM_VALIDATIONS.REQUIRED_FIELD),
        type: yup
          .string()
          .oneOf(TAX_TYPE.map((value) => value))
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        amount: yup
          .number()
          .positive(FORM_VALIDATIONS.MUST_BE_A_POSITIVE_NUMBER_FIELD)
          .required(FORM_VALIDATIONS.REQUIRED_FIELD)
          .when("type", (type, schema) => {
            return type === "PERCENTAGE_OVER_TOTAL"
              ? schema
                  .min(0, "El porcentaje debe estar entre 0 a 1")
                  .max(1, "El porcentaje debe estar entre 0 a 1")
              : schema.min(100, "El valor fijo debe ser mayor a 100 Pesos");
          })
          .typeError(FORM_VALIDATIONS.MUST_BE_A_POSITIVE_NUMBER_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
