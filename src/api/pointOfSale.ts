import { PointOfSale } from "@dto/pointOfSale";
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
import { AxiosDjangoSerializerFormError } from "@dto/common";

const client = mainAxiosClient.getInstance();

const instancesDescriptorPointOfSale =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

const instancesDescriptorPointOfSaleWorkShift =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSaleWorkShift];

export interface GetPointOfSale extends PointOfSale {
  authorizedUsers: number[];
  readonly printerIpAddress: string;
  readonly printer: number;
}

export interface OpenPointOfSaleWorkShiftRequest {
  initialCash: number;
  pointOfSale: number;
}

export interface ClosePointOfSaleWorkShiftRequest {
  finalCash: number;
  finalCashUsd: number;
  pointOfSaleWorkShiftId: number;
}

export const openPointOfSale = ({
  pointOfSale,
  initialCash,
}: OpenPointOfSaleWorkShiftRequest) =>
  client.post(`${instancesDescriptorPointOfSaleWorkShift.apiRoute}/` || "", {
    initialCash,
    pointOfSale,
  });

export const closePointOfSaleWorkShift = ({
  pointOfSaleWorkShiftId,
  finalCash,
  finalCashUsd,
}: ClosePointOfSaleWorkShiftRequest) =>
  client.post(
    `${instancesDescriptorPointOfSaleWorkShift.apiRoute}${pointOfSaleWorkShiftId}/close/` ||
      "",
    {
      finalCash,
      finalCashUsd,
    }
  );

export const fetchPointOfSaleById = (id: number) =>
  client.get(`${instancesDescriptorPointOfSale.apiRoute}/${id}` || "");

export const addAuthorizedUserToPointOfSaleId = ({
  pointOfSaleId,
  employeeId: userId,
}: {
  pointOfSaleId: number;
  employeeId: number;
}) =>
  client.post(
    `${instancesDescriptorPointOfSale.apiRoute}/${pointOfSaleId}/users/` || "",
    { userId }
  );

export const removeAuthorizedUserToPointOfSaleId = ({
  pointOfSaleId,
  employeeId: userId,
}: {
  pointOfSaleId: number;
  employeeId: number;
}) =>
  client.delete(
    `${instancesDescriptorPointOfSale.apiRoute}/${pointOfSaleId}/users/${userId}/` ||
      ""
  );

export const getPointOfSaleOpen = (
  getPointOfSaleAccessResponse: GetPointOfSaleAccess
): GetPointOfSale | undefined =>
  (getPointOfSaleAccessResponse?.openWorkShift &&
    getPointOfSaleAccessResponse.authorizedPointsOfSale.find(
      (pointOfSale) =>
        pointOfSale.id ===
        getPointOfSaleAccessResponse?.openWorkShift?.pointOfSale
    )) ||
  undefined;

export const usePointOfSaleAccessQuery = () => {
  return useQuery<
    GetPointOfSaleAccess,
    AxiosDjangoSerializerFormError<GetPointOfSaleAccess>
  >(
    ["current-user", "point-of-sale-access"],
    () => fetchEmployeePointOfSaleAccess().then((response) => response.data),
    {
      refetchInterval: 50000,
    }
  );
};
