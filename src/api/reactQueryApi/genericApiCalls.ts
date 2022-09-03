import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/index";
import { AxiosResponseListPaginationData } from "@dto/common";

const client = mainAxiosClient.getInstance();

export const fetchAllGenericPaginationApiCall = <ApiResponseDataType>(
  url: string,
  limit: number,
  offset: number,
  params: Record<string, unknown>
): Promise<
  AxiosResponse<AxiosResponseListPaginationData<ApiResponseDataType>>
> =>
  client.get(url, {
    params: { limit, offset, ...params },
  });

export const fetchAllGenericApiCall = <ApiResponseDataType>(
  url: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse<ApiResponseDataType[]>> => client.get(url, { params });

export const createGenericApiCall = <
  CreateDataType,
  ApiResponseDataType = CreateDataType
>(
  url: string,
  data: CreateDataType
): Promise<AxiosResponse<ApiResponseDataType>> => client.post(url, data);

export const deleteGenericApiCall = (
  url: string,
  id: number | string
): Promise<AxiosResponse> => client.delete(`${url}${id}/`);

export const fetchGenericApiCall = <ApiResponseDataType>(
  url: string,
  id: number | string
): Promise<AxiosResponse<ApiResponseDataType>> => client.get(`${url}${id}/`);

export const patchGenericApiCall = <
  PatchDataType,
  ApiResponseDataType = PatchDataType
>(
  url: string,
  id: number | string,
  data: Partial<PatchDataType>
): Promise<AxiosResponse<ApiResponseDataType>> =>
  client.patch(`${url}${id}/`, data);

export const putGenericApiCall = <
  PutDataType,
  ApiResponseDataType extends PutDataType = PutDataType
>(
  url: string,
  id: number | string,
  data: Partial<PutDataType>
): Promise<AxiosResponse<ApiResponseDataType>> =>
  client.put(`${url}${id}/`, data);
