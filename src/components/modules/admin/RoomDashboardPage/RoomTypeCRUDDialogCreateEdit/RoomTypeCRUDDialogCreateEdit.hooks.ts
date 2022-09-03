import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

const useDialogCreateEditCRUDValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        value: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD).min(0),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useDialogCreateEditCRUDValidation;
