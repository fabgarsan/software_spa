import { PointOfSale, PointOfSaleWorkShift } from "@dto/pointOfSale";
import { AxiosError, AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";
import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEmployeePointOfSaleAccess,
  GetPointOfSaleAccess,
} from "@api/user";

const client = mainAxiosClient.getInstance();

const instancesDescriptorPointOfSale =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

const instancesDescriptorPointOfSaleWorkShift =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSaleWorkShift];

export interface GetPointOfSale extends PointOfSale {
  authorizedUsers: number[];
}

export interface OpenPointOfSaleWorkShiftRequest {
  initialCash: number;
  PointOfSaleId: number;
}

export const openPointOfSale = ({
  pointOfSale,
  initialCash,
}: {
  pointOfSale: number;
  initialCash: number;
}): Promise<AxiosResponse<PointOfSaleWorkShift>> =>
  client.post<
    OpenPointOfSaleWorkShiftRequest,
    AxiosResponse<PointOfSaleWorkShift>
  >(`${instancesDescriptorPointOfSaleWorkShift.apiRoute}/` || "", {
    initialCash,
    pointOfSale,
  });

export const fetchPointOfSaleById = (
  id: number
): Promise<AxiosResponse<GetPointOfSale>> =>
  client.get<GetPointOfSale>(
    `${instancesDescriptorPointOfSale.apiRoute}/${id}` || ""
  );

export const addAuthorizedUserToPointOfSaleId = ({
  pointOfSaleId,
  employeeId: userId,
}: {
  pointOfSaleId: number;
  employeeId: number;
}): Promise<AxiosResponse<GetPointOfSale>> =>
  client.post<GetPointOfSale>(
    `${instancesDescriptorPointOfSale.apiRoute}/${pointOfSaleId}/users/` || "",
    { userId }
  );

export const removeAuthorizedUserToPointOfSaleId = ({
  pointOfSaleId,
  employeeId: userId,
}: {
  pointOfSaleId: number;
  employeeId: number;
}): Promise<AxiosResponse<GetPointOfSale>> =>
  client.delete<GetPointOfSale>(
    `${instancesDescriptorPointOfSale.apiRoute}/${pointOfSaleId}/users/${userId}/` ||
      ""
  );

export const usePointOfSaleAccessQuery = () => {
  return useQuery<GetPointOfSaleAccess, AxiosError>(
    ["current-user", "point-of-sale-access"],
    () => fetchEmployeePointOfSaleAccess().then((response) => response.data),
    {
      refetchInterval: 50000,
    }
  );
};

export const getPointOfSaleOpen = (
  getPointOfSaleAccessResponse: GetPointOfSaleAccess
): PointOfSale | undefined =>
  (getPointOfSaleAccessResponse?.openWorkShift &&
    getPointOfSaleAccessResponse.authorizedPointsOfSale.find(
      (pointOfSale) =>
        pointOfSale.id ===
        getPointOfSaleAccessResponse?.openWorkShift?.pointOfSale
    )) ||
  undefined;
