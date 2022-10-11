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

export interface PrintInvoiceResponse {
  uniqueInvoiceNumber: number;
  companyName: string;
  companyNit: string;
  dianResolutionNumber: string;
  automaticRange: string;
  description: string;
  printCount: number;
  minutes: number;
  startDatetime: Date;
  paymentDatetime: Date;
  cashierName: string;
  cashierUsername: string;
  taxDescription: string;
  tax: number;
  base: number;
  total: number;
}

export interface GetParkingServiceResponse extends ParkingService {
  readonly licensePlate: string;
  readonly vehicleTypeName: string;
  readonly lengthOfServiceMinutes: number;
}

export interface CreateParkingServiceRequest {
  parkingPlan: number;
  writeLicensePlate: string;
}

export interface PayParkingServiceRequest {
  value: number;
}

export interface FetchParkingServicesParams {
  date?: string;
  dateTo?: string;
  dateFrom?: string;
  search?: string;
  finished?: boolean;
}

export const printParkingInvoice = (
  parkingServiceId: number
): Promise<AxiosResponse<PrintInvoiceResponse>> =>
  client.get<PrintInvoiceResponse>(
    `${instancesDescriptorParkingService.apiRoute}${parkingServiceId}/print-invoice/` ||
      ""
  );

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

export const fetchParkingServices = (
  params?: FetchParkingServicesParams
): Promise<AxiosResponse<GetParkingServiceResponse[]>> =>
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
