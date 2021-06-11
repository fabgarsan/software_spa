import { useMemo } from "react";
import * as yup from "yup";
import { MESSAGES } from "@utils/index";
import { useYupValidationResolver } from "@hooks/index";

const useSingInValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required(MESSAGES.FORM_REQUIRED_FIELD),
        password: yup.string().required(MESSAGES.FORM_REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useSingInValidation;
