import { useQuery } from "@tanstack/react-query";
import {
  fetchAvailableParkingPlans,
  GetParkingPlanResponse,
} from "@api/parking";
import { AxiosDjangoSerializerDetailError } from "@dto/common";

export const useParkingPlansQuery = () =>
  useQuery<GetParkingPlanResponse[], AxiosDjangoSerializerDetailError>(
    ["parking-plans"],
    () => fetchAvailableParkingPlans().then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
