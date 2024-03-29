import { mainAxiosClient } from "@clients/axios";
import { instancesDescriptor, InstancesDescriptorKeys } from "@utils/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ExtendedUser } from "@dto/users";
import { GetPointOfSale } from "@api/pointOfSale";
import { GetParkingServiceResponse } from "@api/parking";
import { PointOfSaleWorkShift } from "@dto/pointOfSale";
import {
  CreateNewOptCodeRequest,
  GenerateNewOptCodeResponse,
  GetOptCodeResponse,
} from "@api/authenticator";

const client = mainAxiosClient.getInstance();

const instancesDescriptorUser =
  instancesDescriptor[InstancesDescriptorKeys.user];

const instancesDescriptorEmployee =
  instancesDescriptor[InstancesDescriptorKeys.employee];

const instancesDescriptorEscort =
  instancesDescriptor[InstancesDescriptorKeys.escort];

export interface GetPointOfSaleAccess {
  authorizedPointsOfSale: GetPointOfSale[];
  openWorkShift?: PointOfSaleWorkShift;
}

export interface ChangePasswordCurrentUserRequest {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const changePasswordCurrentUser = (
  data: ChangePasswordCurrentUserRequest
): Promise<void> =>
  client.post<
    GetParkingServiceResponse,
    void,
    ChangePasswordCurrentUserRequest
  >(
    `${instancesDescriptorUser.apiRoute}set-new-password-current-user/` || "",
    data
  );

export const fetchEmployeePointOfSaleAccess = (): Promise<
  AxiosResponse<GetPointOfSaleAccess>
> =>
  client.get<GetPointOfSaleAccess>(
    `${instancesDescriptorEmployee.apiRoute}point-of-sale-access/` || ""
  );

export const fetchEmployees = ({
  params,
}: {
  params?: { isActive: boolean };
}): Promise<AxiosResponse<ExtendedUser[]>> =>
  client.get<ExtendedUser[]>(`${instancesDescriptorEmployee.apiRoute}` || "", {
    params: {
      extended_user__user_type: "T",
      ...params,
    },
  });

export const useAddEscortServiceMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (serviceId: number) =>
      client
        .put(`${instancesDescriptorEscort.apiRoute}${escortId}/services/`, {
          serviceId,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useRemoveEscortServiceMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (serviceId: number) =>
      client
        .delete(
          `${instancesDescriptorEscort.apiRoute}${escortId}/services/${serviceId}`
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useUploadEscortImageMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string | undefined;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    ({ file, type }: { file: Blob; type: "I" | "P" }) => {
      const data = new FormData();
      const extension = file.type.split("/").slice(-1);
      data.append("image", file, `prueba.${extension}`);
      data.append("type", type);
      return client.post(
        `${instancesDescriptorEscort.apiRoute}${escortId}/upload-escort-image/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const fetchOptCodesByUser = (
  userId: number
): Promise<AxiosResponse<GetOptCodeResponse[]>> =>
  client.get<GetOptCodeResponse[]>(
    `${instancesDescriptorUser.apiRoute}${userId}/otp-codes-operation/` || ""
  );

export const generateNewOptCodeByUser = (
  userId: number
): Promise<AxiosResponse<GenerateNewOptCodeResponse>> =>
  client.get<GenerateNewOptCodeResponse>(
    `${instancesDescriptorUser.apiRoute}${userId}/generate-otp-codes-operation/` ||
      ""
  );

export const createNewOptCodeByUser = (
  userId: number,
  data: CreateNewOptCodeRequest
): Promise<AxiosResponse> =>
  client.post<null, AxiosResponse, CreateNewOptCodeRequest>(
    `${instancesDescriptorUser.apiRoute}${userId}/otp-codes-operation/` ||
      "" ||
      "",
    data
  );
