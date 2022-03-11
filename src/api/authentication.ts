import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";

const { client, removeToken } = mainAxiosClientManager;

export const logIn = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  localStorage.removeItem("token");
  removeToken();
  return client.post(`${API_ROUTES.AUTHENTICATION}login/`, {
    username,
    password,
  });
};

export const logOut = (): Promise<AxiosResponse> =>
  client.post(`${API_ROUTES.AUTHENTICATION}logout/`);

export const loadUser = (): Promise<AxiosResponse> => {
  return client.get(`${API_ROUTES.USER}current/`);
};
