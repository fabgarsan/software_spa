import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { AxiosResponsePaginationData } from "@dbTypes/common";

export const fetchEscortCategories = <T>(
  limit: number,
  offset: number
): Promise<AxiosResponse<AxiosResponsePaginationData<T>>> =>
  mainAxiosClientManager.client.get(`escorts-categories/`, {
    params: { limit, offset },
  });

export const createEscortCategory = <T>(data: T): Promise<AxiosResponse<T>> =>
  mainAxiosClientManager.client.post(`escorts-categories/`, data);

export const deleteEscortCategory = (
  id: number | string
): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.delete(`escorts-categories/${id}/`);

export const fetchEscortCategory = <T>(
  id: number | string
): Promise<AxiosResponse<T>> =>
  mainAxiosClientManager.client.get(`escorts-categories/${id}/`);

export const editEscortCategory = <T>(
  id: number | string,
  data: T
): Promise<AxiosResponse<T>> =>
  mainAxiosClientManager.client.put(`escorts-categories/${id}/`, data);
