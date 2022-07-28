import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";

const { client } = mainAxiosClientManager;

export const addEscortService = (
  userId: string,
  data: { serviceId: number }
): Promise<AxiosResponse> =>
  client.put(`${API_ROUTES.USER}${userId}/services/`, data);

export const removeEscortService = (
  userId: string,
  serviceId: number
): Promise<AxiosResponse> =>
  client.delete(`${API_ROUTES.USER}${userId}/services/${serviceId}`);

export const uploadEscortImage = (
  userId: string,
  file: Blob,
  type: "I" | "P"
): Promise<AxiosResponse> => {
  const data = new FormData();
  const extension = file.type.split("/").slice(-1);
  data.append("image", file, `prueba.${extension}`);
  data.append("type", type);
  return client.post(`${API_ROUTES.USER}${userId}/upload-escort-image/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
