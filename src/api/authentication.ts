import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const addTokenAxios = (token: string) => {
  axios.defaults.headers.common = {
    Authorization: `Token ${token}`,
  };
};

export const logIn = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common.Authorization;
  return axios.post(`${baseUrl}/auth/login/`, {
    username,
    password,
  });
};
export const logOut = (): Promise<AxiosResponse> =>
  axios.post(`${baseUrl}/auth/logout/`);

export const loadUser = (): Promise<AxiosResponse> => {
  const token = localStorage.getItem("token");
  if (token) {
    addTokenAxios(token);
  }
  return axios.get(`${baseUrl}/users/current/`);
};
