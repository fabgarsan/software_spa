import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";

const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        active: yup.boolean(),
        hasIncomeOperations: yup.boolean(),
        hasOutcomesOperations: yup.boolean(),
        hasParkingLotServicesSales: yup.boolean(),
        hasEscortServicesSales: yup.boolean(),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export default useValidation;
