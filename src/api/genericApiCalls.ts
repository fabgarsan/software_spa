import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { AxiosResponseListPaginationData } from "@dbTypes/common";

export const fetchAllGenericPaginationApiCall = <T>(
  url: string,
  limit: number,
  offset: number,
  params: any
): Promise<AxiosResponse<AxiosResponseListPaginationData<T>>> =>
  mainAxiosClientManager.client.get(url, {
    params: { limit, offset, ...params },
  });

export const fetchAllGenericApiCall = <T>(
  url: string,
  params: any
): Promise<AxiosResponse<T[]>> =>
  mainAxiosClientManager.client.get(url, { params });

export const createGenericApiCall = <T>(
  url: string,
  data: T
): Promise<AxiosResponse<T>> => mainAxiosClientManager.client.post(url, data);

export const deleteGenericApiCall = (
  url: string,
  id: number | string
): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.delete(`${url}${id}/`);

export const fetchGenericApiCall = <T>(
  url: string,
  id: number | string
): Promise<AxiosResponse<T>> =>
  mainAxiosClientManager.client.get(`${url}${id}/`);

export const editGenericApiCall = <T>(
  url: string,
  id: number | string,
  data: T
): Promise<AxiosResponse<T>> =>
  mainAxiosClientManager.client.patch(`${url}${id}/`, data);
