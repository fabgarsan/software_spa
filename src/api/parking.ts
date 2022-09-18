import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosResponse } from "axios";
import { VehicleType, ParkingPlan } from "@dto/parking";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

const instancesDescriptorVehicleType =
  instancesDescriptor[InstancesDescriptorKeys.vehicleType];

export interface GetParkingPlan extends ParkingPlan {
  readonly vehicleTypeName: string;
}

export const fetchVehicleTypes = (): Promise<AxiosResponse<VehicleType[]>> =>
  client.get<VehicleType[]>(instancesDescriptorVehicleType.apiRoute || "");
