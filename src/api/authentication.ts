import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";

export const logIn = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  localStorage.removeItem("token");
  mainAxiosClientManager.removeToken();
  return mainAxiosClientManager.client.post(
    `${API_ROUTES.AUTHENTICATION}login/`,
    {
      username,
      password,
    }
  );
};

export const logOut = (): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.post(`${API_ROUTES.AUTHENTICATION}logout/`);

export const loadUser = (): Promise<AxiosResponse> => {
  return mainAxiosClientManager.client.get(`${API_ROUTES.USER}current/`);
};
