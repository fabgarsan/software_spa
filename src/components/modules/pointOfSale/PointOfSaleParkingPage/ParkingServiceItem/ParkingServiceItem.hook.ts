import { useQuery } from "@tanstack/react-query";
import { fetchParkingServices, GetParkingServiceResponse } from "@api/parking";
import { AxiosDjangoSerializerDetailError } from "@dto/common";

export const useCurrentParkingServicesQuery = () =>
  useQuery<GetParkingServiceResponse[], AxiosDjangoSerializerDetailError>(
    ["parking-services"],
    () =>
      fetchParkingServices({ finished: true }).then(
        (response) => response.data
      ),
    {
      staleTime: 1000,
      refetchInterval: 1000 * 30,
    }
  );
