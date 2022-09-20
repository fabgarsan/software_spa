import { useMutation } from "@tanstack/react-query";
import {
  closePointOfSaleWorkShift,
  ClosePointOfSaleWorkShiftRequest,
} from "@api/pointOfSale";
import { useMemo } from "react";
import * as yup from "yup";
import { FORM_VALIDATIONS } from "@utils/constantsUI";
import { useYupValidationResolver } from "@hooks/index";
import { PointOfSaleWorkShift } from "@dto/pointOfSale";
import { AxiosDjangoSerializerFormError } from "@dto/common";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        finalCash: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        finalCashUsd: yup
          .number()
          .min(0)
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};
export const useClosePointOfSaleWorkShiftMutation = ({
  pointOfSaleWorkShiftId,
  onSuccessCallBack,
}: {
  pointOfSaleWorkShiftId: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    PointOfSaleWorkShift,
    AxiosDjangoSerializerFormError<ClosePointOfSaleWorkShiftRequest>,
    {
      finalCash: number;
      finalCashUsd: number;
    }
  >(
    ({
      finalCash,
      finalCashUsd,
    }: {
      finalCash: number;
      finalCashUsd: number;
    }) =>
      closePointOfSaleWorkShift({
        finalCash,
        finalCashUsd,
        pointOfSaleWorkShiftId,
      }).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
