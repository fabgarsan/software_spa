import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/index";
import { AxiosResponseListPaginationData } from "@dto/common";

const client = mainAxiosClient.getInstance();

export const fetchAllGenericPaginationApiCall = <T>(
  url: string,
  limit: number,
  offset: number,
  params: Record<string, unknown>
): Promise<AxiosResponse<AxiosResponseListPaginationData<T>>> =>
  client.get(url, {
    params: { limit, offset, ...params },
  });

export const fetchAllGenericApiCall = <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse<T[]>> => client.get(url, { params });

export const createGenericApiCall = <T>(
  url: string,
  data: T
): Promise<AxiosResponse<T>> => client.post(url, data);

export const deleteGenericApiCall = (
  url: string,
  id: number | string
): Promise<AxiosResponse> => client.delete(`${url}${id}/`);

export const fetchGenericApiCall = <T>(
  url: string,
  id: number | string
): Promise<AxiosResponse<T>> => client.get(`${url}${id}/`);

export const editGenericApiCall = <T>(
  url: string,
  id: number | string,
  data: Partial<T>
): Promise<AxiosResponse<T>> => client.patch(`${url}${id}/`, data);
