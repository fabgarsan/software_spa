import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchCategories } from "@api/escort";
import { EscortCategory } from "@dto/escorts";

const useDialogCreateEditCRUDEscortCategoryValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        value: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD).min(0),
        category: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        minutes: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD).min(0),
        publishedWeb: yup.boolean(),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useCategoriesQuery = () => {
  return useQuery<EscortCategory[], AxiosError>(
    ["escort-categories"],
    () => fetchCategories().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};

export default useDialogCreateEditCRUDEscortCategoryValidation;
