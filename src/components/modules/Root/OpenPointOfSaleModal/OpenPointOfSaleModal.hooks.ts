import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useMutation } from "@tanstack/react-query";
import { openPointOfSale } from "@api/pointOfSale";
import { PointOfSaleWorkShift } from "@dto/pointOfSale";
import { AxiosDjangoSerializerFormError } from "@dto/common";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        initialCash: yup
          .number()
          .min(0)
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useOpenPointOfSaleWorkShiftMutation = ({
  pointOfSale,
  onSuccessCallBack,
}: {
  pointOfSale: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    PointOfSaleWorkShift,
    AxiosDjangoSerializerFormError<PointOfSaleWorkShift>,
    number
  >(
    (initialCash: number) =>
      openPointOfSale({ initialCash, pointOfSale }).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
