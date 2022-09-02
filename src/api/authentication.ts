import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/index";
import { API_ROUTES } from "@utils/index";

const client = mainAxiosClient.getInstance();

export interface AuthUser {
  id: number;
  username: string;
}

export interface Login {
  token: string;
  user: AuthUser;
}

export interface AuthCredential {
  username: string;
  password: string;
}

export const logIn = ({
  username,
  password,
}: AuthCredential): Promise<AxiosResponse<Login>> => {
  localStorage.removeItem("token");
  mainAxiosClient.removeToken();
  return client.post<Login>(`${API_ROUTES.AUTHENTICATION}login/`, {
    username,
    password,
  });
};

export const logOut = (): Promise<AxiosResponse> =>
  client.post(`${API_ROUTES.AUTHENTICATION}logout/`);

export const loadUser = (): Promise<AxiosResponse<AuthUser>> =>
  client.get<AuthUser>(`${API_ROUTES.USER}current/`);
