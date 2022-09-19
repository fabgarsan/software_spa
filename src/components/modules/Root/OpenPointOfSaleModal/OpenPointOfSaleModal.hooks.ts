import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useMutation } from "@tanstack/react-query";
import {
  openPointOfSale,
  OpenPointOfSaleWorkShiftRequest,
} from "@api/pointOfSale";
import { PointOfSaleWorkShift } from "@dto/pointOfSale";
import { AxiosError } from "axios";

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
  useMutation(
    (initialCash: number) =>
      openPointOfSale({ initialCash, pointOfSale }).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
