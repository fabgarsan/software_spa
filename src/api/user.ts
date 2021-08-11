import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";

export const addEscortService = (
  userId: string,
  data: { serviceId: number }
): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.post(
    `${API_ROUTES.USER}${userId}/add-escort-service/`,
    data
  );

export const removeEscortService = (
  userId: string,
  data: { serviceId: number }
): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.post(
    `${API_ROUTES.USER}${userId}/remove-escort-service/`,
    data
  );

export const uploadEscortImage = (
  userId: string,
  file: Blob
): Promise<AxiosResponse> => {
  const data = new FormData();
  data.append("image", file, "prueba.png");
  return mainAxiosClientManager.client.post(
    `${API_ROUTES.USER}${userId}/upload-escort-image/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
