import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";
import { API_ROUTES } from "@utils/constants";

const client = mainAxiosClient.getInstance();

export type Permission = {
  id: number;
  name: string;
  codename: string;
  contentType: number;
};

export const fetchPermissionCurrentUser = (): Promise<
  AxiosResponse<Permission[]>
> => client.get<Permission[]>(`${API_ROUTES.PERMISSION}current_user/`);
