import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/axios";
import { API_ROUTES } from "@utils/constants";

export const fetchPermissionCurrentUser = (): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.get(`${API_ROUTES.PERMISSION}current_user/`);
