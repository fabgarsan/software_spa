import axios from "axios";
import { addTokenAxios } from "@utils/commonFunctions";

const baseUrl = process.env.REACT_APP_API_URL;

export const logIn = (username: string, password: string) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common.Authorization;
  return axios.post(`${baseUrl}/auth/login/`, {
    username,
    password,
  });
};
export const logOut = () => axios.post(`${baseUrl}/auth/logout/`);
export const loadUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    addTokenAxios(token);
  }
  return axios.get(`${baseUrl}/users/current/`);
};
