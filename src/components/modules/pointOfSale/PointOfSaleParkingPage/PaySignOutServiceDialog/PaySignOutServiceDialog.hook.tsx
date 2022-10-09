import { useMutation, useQuery } from "@tanstack/react-query";
import {
  finishParkingService,
  GetParkingServiceResponse,
  getParkingServicesAmountToPay,
  GetParkingServicesAmountToPayResponse,
  payParkingService,
  PayParkingServiceRequest,
  PrintInvoiceResponse,
  printParkingInvoice,
} from "@api/parking";
import {
  AxiosDjangoSerializerDetailError,
  AxiosDjangoSerializerFormError,
} from "@dto/common";
import store from "@stores/store";
import { createNotification } from "@stores/notificationSlice";

export const usePrintParkingInvoiceQuery = ({
  parkingServiceId,
  enabled = false,
  callback,
}: {
  parkingServiceId: number;
  enabled: boolean;
  callback: (data: PrintInvoiceResponse) => void;
}) =>
  useQuery<PrintInvoiceResponse, AxiosDjangoSerializerDetailError>(
    ["parking-invoice-print", parkingServiceId],
    () => printParkingInvoice(parkingServiceId).then((res) => res.data),
    {
      staleTime: 1000 * 60,
      enabled,
      onSuccess: callback,
    }
  );

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
      cacheTime: 0,
    }
  );

export const usePayParkingServiceMutation = ({
  parkingServiceId,
  callback,
}: {
  parkingServiceId: number;
  callback: () => void;
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
        callback();
        store.dispatch(
          createNotification({
            message: `Pago realizado!`,
            severity: "success",
            time: 5000,
          })
        );
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
