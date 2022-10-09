import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        active: yup.boolean(),
        ipAddress: yup
          .string()
          .matches(
            /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/,
            "Debe ser una Dirección IP valida"
          )
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
        model: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        brand: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
