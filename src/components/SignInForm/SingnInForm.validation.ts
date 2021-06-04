import {useMemo} from "react";
import * as yup from "yup";
import useYupValidationResolver from "../../hooks/useYupValidationResolver";

const useSingInValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required("Campo Requerido"),
        password: yup.string().required("Campo Requerido")
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
}

export default useSingInValidation;