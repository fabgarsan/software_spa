import axios, { AxiosInstance } from "axios";

import { API_URL } from "../enviromentalConstants.js";

export const AxiosClientManagerClosure = () => {
  let axiosInstance: AxiosInstance | null = null;
  let tokenName: string | null;

  const initiateClient = ({
    tokenNameForClient,
    baseURL,
  }: {
    tokenNameForClient: string;
    baseURL: string;
  }): AxiosInstance => {
    axiosInstance = axios.create({ baseURL });
    tokenName = tokenNameForClient;
    return axiosInstance;
  };

  const getInstance = (): AxiosInstance => {
    if (axiosInstance) {
      return axiosInstance;
    } else {
      throw Error("You must initiate the client first");
    }
  };

  const addToken = (token: string): void => {
    if (axiosInstance && tokenName) {
      axiosInstance.defaults.headers.common = {
        Authorization: `Token ${token}`,
      };
      localStorage.setItem(tokenName, token);
    } else {
      throw Error("You must initiate the client first");
    }
  };

  const removeToken = (): void => {
    if (axiosInstance && tokenName) {
      localStorage.removeItem(tokenName);
      localStorage.removeItem("permissions");
      delete axiosInstance.defaults.headers.common.Authorization;
    } else {
      throw Error("You must initiate the client first");
    }
  };

  const loadToken = (): void => {
    if (axiosInstance && tokenName) {
      const token = localStorage.getItem(tokenName);
      axiosInstance.defaults.headers.common = {
        Authorization: `Token ${token}`,
      };
    }
  };
  return {
    getInstance,
    removeToken,
    loadToken,
    addToken,
    initiateClient,
  };
};

const mainClient = AxiosClientManagerClosure();
mainClient.initiateClient({
  tokenNameForClient: "main_token",
  baseURL: API_URL,
});
mainClient.loadToken();
export const mainAxiosClient = mainClient;
