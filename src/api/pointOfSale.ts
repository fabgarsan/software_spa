import { PointOfSale } from "@dto/pointOfSale";
import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";
import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";

const client = mainAxiosClient.getInstance();

const instancesDescriptorPointOfSale =
  instancesDescriptor[InstancesDescriptorKeys.pointOfSale];

export interface GetPointOfSale extends PointOfSale {
  authorizedUsers: number[];
}

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
