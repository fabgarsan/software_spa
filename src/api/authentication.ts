import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";

export const logIn = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  localStorage.removeItem("token");
  mainAxiosClientManager.removeToken();
  return mainAxiosClientManager.client.post(`/auth/login/`, {
    username,
    password,
  });
};

export const logOut = (): Promise<AxiosResponse> =>
  mainAxiosClientManager.client.post(`/auth/logout/`);

export const loadUser = (): Promise<AxiosResponse> => {
  return mainAxiosClientManager.client.get(`/users/current/`);
};
