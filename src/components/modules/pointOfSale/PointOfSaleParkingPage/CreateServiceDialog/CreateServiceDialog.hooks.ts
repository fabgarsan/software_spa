import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosDjangoSerializerFormError } from "@dto/common";
import {
  createParkingService,
  CreateParkingServiceRequest,
  GetParkingServiceResponse,
} from "@api/parking";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        writeLicensePlate: yup
          .string()
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useCreateParkingServiceMutation = ({
  parkingPlan,
  onSuccessCallBack,
}: {
  parkingPlan: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    GetParkingServiceResponse,
    AxiosDjangoSerializerFormError<CreateParkingServiceRequest>,
    string
  >(
    (writeLicensePlate: string) =>
      createParkingService({
        parkingPlan,
        writeLicensePlate,
      }).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
