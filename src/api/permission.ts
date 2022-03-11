import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/axios";
import { API_ROUTES } from "@utils/constants";

const { client } = mainAxiosClientManager;

export const fetchPermissionCurrentUser = (): Promise<AxiosResponse> =>
  client.get(`${API_ROUTES.PERMISSION}current_user/`);
