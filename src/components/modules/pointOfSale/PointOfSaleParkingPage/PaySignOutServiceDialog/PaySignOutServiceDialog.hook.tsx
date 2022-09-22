import { useMutation, useQuery } from "@tanstack/react-query";
import {
  payParkingService,
  PayParkingServiceRequest,
  GetParkingServiceResponse,
  getParkingServicesAmountToPay,
  GetParkingServicesAmountToPayResponse,
  finishParkingService,
} from "@api/parking";
import {
  AxiosDjangoSerializerDetailError,
  AxiosDjangoSerializerFormError,
} from "@dto/common";

export const useParkingServiceValueToPayQuery = (parkingServiceId: number) =>
  useQuery<
    GetParkingServicesAmountToPayResponse,
    AxiosDjangoSerializerDetailError
  >(
    ["parking-services", parkingServiceId, "amount-to-pay"],
    () =>
      getParkingServicesAmountToPay(parkingServiceId).then(
        (response) => response.data
      ),
    {
      staleTime: 3000,
    }
  );

export const usePayParkingServiceMutation = ({
  parkingServiceId,
  onSuccessCallBack,
}: {
  parkingServiceId: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    GetParkingServiceResponse,
    AxiosDjangoSerializerFormError<PayParkingServiceRequest>,
    number
  >(
    (value: number) =>
      payParkingService(parkingServiceId, { value }).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useFinishParkingServiceMutation = ({
  parkingServiceId,
  onSuccessCallBack,
}: {
  parkingServiceId: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    GetParkingServiceResponse,
    AxiosDjangoSerializerFormError<PayParkingServiceRequest>
  >(() => finishParkingService(parkingServiceId).then((res) => res.data), {
    onSuccess: () => {
      if (onSuccessCallBack) onSuccessCallBack();
    },
  });
