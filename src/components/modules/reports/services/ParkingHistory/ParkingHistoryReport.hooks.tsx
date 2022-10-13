import { useQuery } from "@tanstack/react-query";
import {
  GetParkingServiceResponse,
  FetchParkingServicesParams,
  fetchParkingServices,
} from "@api/parking";
import { AxiosDjangoSerializerDetailError } from "@dto/common";

export const useParkingServicesQuery = ({
  params,
  enabled,
  disableSearch,
}: {
  params: FetchParkingServicesParams;
  enabled: boolean;
  disableSearch: () => void;
}) =>
  useQuery<GetParkingServiceResponse[], AxiosDjangoSerializerDetailError>(
    ["parking-plans", params],
    () => fetchParkingServices(params).then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
      onSuccess: () => {
        if (disableSearch) disableSearch();
      },
      onError: () => disableSearch(),
    }
  );
