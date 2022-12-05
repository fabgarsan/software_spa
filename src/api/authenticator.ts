import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";
import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";

const client = mainAxiosClient.getInstance();

export interface GenerateNewOptCodeResponse {
  code: string;
  url: string;
  deviceName: string;
}

export interface GetOptCodeResponse {
  id: number;
  deviceName: string;
  created: string;
  updated: string;
  validationCount: number;
}

export interface CreateNewOptCodeRequest {
  code: string;
  token: string;
  deviceName: string;
}

const instancesDescriptorAuthenticator =
  instancesDescriptor[InstancesDescriptorKeys.authenticator];

export const generateNewOptCode = (): Promise<
  AxiosResponse<GenerateNewOptCodeResponse>
> =>
  client.get<GenerateNewOptCodeResponse>(
    `${instancesDescriptorAuthenticator.apiRoute}otp-codes-operation/` || ""
  );

export const fetchOptCodes = (): Promise<AxiosResponse<GetOptCodeResponse[]>> =>
  client.get<GetOptCodeResponse[]>(
    instancesDescriptorAuthenticator.apiRoute || ""
  );

export const deleteOptCode = (id: number): Promise<AxiosResponse<void>> =>
  client.delete<void>(
    `${instancesDescriptorAuthenticator.apiRoute}${id}/` || ""
  );

export const createNewOptCode = (
  data: CreateNewOptCodeRequest
): Promise<AxiosResponse> =>
  client.post<null, AxiosResponse, CreateNewOptCodeRequest>(
    `${instancesDescriptorAuthenticator.apiRoute}otp-codes-operation/` ||
      "" ||
      "",
    data
  );
