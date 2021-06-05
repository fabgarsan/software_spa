import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";

const baseUrl = process.env.REACT_APP_API_URL;
export const loadEscortCategories = (
  limit: number,
  offset: number
): Promise<AxiosResponse> => {
  return mainAxiosClientManager.client.get(`${baseUrl}/escorts-categories/`, {
    params: { limit, offset },
  });
};
