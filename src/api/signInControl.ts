import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";
import { ExtendedUser } from "@dto/users";
import { SignInControl } from "@dto/authentication";

const { client } = mainAxiosClientManager;

export const performSignIn = (
  userId: number
): Promise<AxiosResponse<ExtendedUser>> =>
  client.post(`${API_ROUTES.SIGN_IN_CONTROL}sing_in/`, {
    user_id: userId,
  });

export const performSignOut = (
  userId: number
): Promise<AxiosResponse<ExtendedUser>> =>
  client.post(`${API_ROUTES.SIGN_IN_CONTROL}sing_out/`, {
    user_id: userId,
  });

export interface FetchUsersForSignInSignOutParams {
  search?: string;
  is_active?: boolean;
  extended_user__present?: boolean;
}

export const fetchUsersForSignInSignOut = (
  params: FetchUsersForSignInSignOutParams
): Promise<AxiosResponse<ExtendedUser[]>> =>
  client.get<ExtendedUser[]>(API_ROUTES.USER_SIGN_IN_OUT, { params });

export interface FetchSignInOutLogsParams {
  date?: string;
  dateTo?: string;
  dateFrom?: string;
  search?: string;
}

export const fetchSignInOutLogs = (
  params: FetchSignInOutLogsParams
): Promise<AxiosResponse<SignInControl[]>> =>
  client.get<SignInControl[]>(API_ROUTES.SIGN_IN_CONTROL, { params });
