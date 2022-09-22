import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosResponse } from "axios";
import { VehicleType, ParkingPlan, ParkingService } from "@dto/parking";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

const instancesDescriptorVehicleType =
  instancesDescriptor[InstancesDescriptorKeys.vehicleType];
const instancesDescriptorParkingPlan =
  instancesDescriptor[InstancesDescriptorKeys.parkingPlan];
const instancesDescriptorParkingService =
  instancesDescriptor[InstancesDescriptorKeys.parkingService];

export interface GetParkingPlanResponse extends ParkingPlan {
  readonly vehicleTypeName: string;
  readonly hasLicensePlate: boolean;
}

export interface CreateParkingPlanRequest
  extends Omit<ParkingPlan, "timeFrom" | "timeTo"> {
  timeFrom: string;
  timeTo: string;
}

export interface GetParkingServiceResponse extends ParkingService {
  readonly licensePlate: string;
  readonly vehicleTypeName: string;
}

export interface CreateParkingServiceRequest {
  parkingPlan: number;
  writeLicensePlate: string;
}

export interface PayParkingServiceRequest {
  value: number;
}

export const fetchVehicleTypes = (): Promise<AxiosResponse<VehicleType[]>> =>
  client.get<VehicleType[]>(instancesDescriptorVehicleType.apiRoute || "");

export const fetchAvailableParkingPlans = (): Promise<
  AxiosResponse<GetParkingPlanResponse[]>
> =>
  client.get<GetParkingPlanResponse[]>(
    `${instancesDescriptorParkingPlan.apiRoute}available/` || ""
  );

export const createParkingService = (
  data: CreateParkingServiceRequest
): Promise<AxiosResponse<GetParkingServiceResponse>> =>
  client.post<
    GetParkingServiceResponse,
    AxiosResponse<GetParkingServiceResponse>,
    CreateParkingServiceRequest
  >(instancesDescriptorParkingService.apiRoute || "", data);

export const fetchParkingServices = (params?: {
  finished: boolean;
}): Promise<AxiosResponse<GetParkingServiceResponse[]>> =>
  client.get<GetParkingServiceResponse[]>(
    instancesDescriptorParkingService.apiRoute || "",
    { params }
  );

export type GetParkingServicesAmountToPayResponse = {
  rateTime: number;
  rateValue: number;
  timeElapsed: number;
  currentTime: Date;
};

export const getParkingServicesAmountToPay = (
  parkingServiceId: number
): Promise<AxiosResponse<GetParkingServicesAmountToPayResponse>> =>
  client.get<GetParkingServicesAmountToPayResponse>(
    `${instancesDescriptorParkingService.apiRoute}${parkingServiceId}/amount-to-pay/` ||
      ""
  );

export const payParkingService = (
  parkingServiceId: number,
  data: PayParkingServiceRequest
): Promise<AxiosResponse<GetParkingServiceResponse>> =>
  client.post<
    GetParkingServiceResponse,
    AxiosResponse<GetParkingServiceResponse>,
    PayParkingServiceRequest
  >(
    `${instancesDescriptorParkingService.apiRoute}${parkingServiceId}/pay/` ||
      "",
    data
  );

export const finishParkingService = (
  parkingServiceId: number
): Promise<AxiosResponse<GetParkingServiceResponse>> =>
  client.post<
    GetParkingServiceResponse,
    AxiosResponse<GetParkingServiceResponse>
  >(
    `${instancesDescriptorParkingService.apiRoute}${parkingServiceId}/finish/` ||
      ""
  );
