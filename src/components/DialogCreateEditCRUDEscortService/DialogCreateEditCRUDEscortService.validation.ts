import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

const useDialogCreateEditCRUDEscortServiceValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        nameEn: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useDialogCreateEditCRUDEscortServiceValidation;
