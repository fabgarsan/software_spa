import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";

const { client } = mainAxiosClientManager;

export const signIn = (userId: number): Promise<AxiosResponse> =>
  client.post(`${API_ROUTES.SIGN_IN_CONTROL}sing_in/`, {
    user_id: userId,
  });

export const signOut = (userId: number): Promise<AxiosResponse> =>
  client.post(`${API_ROUTES.SIGN_IN_CONTROL}sing_out/`, {
    user_id: userId,
  });
