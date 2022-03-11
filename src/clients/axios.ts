import axios, { AxiosInstance } from "axios";

const { REACT_APP_API_URL = "http://127.0.0.1:8000/interaluse2021" } =
  process.env;

class AxiosClientManager {
  private static instance: AxiosClientManager;

  client: AxiosInstance;

  tokenName: string;

  private constructor({
    baseURL,
    tokenName,
  }: {
    baseURL: string;
    tokenName: string;
  }) {
    this.client = axios.create({ baseURL });
    this.tokenName = tokenName;
    this.loadToken();
  }

  public static getInstance({
    baseURL,
    tokenName,
  }: {
    baseURL: string;
    tokenName: string;
  }): AxiosClientManager {
    if (!AxiosClientManager.instance) {
      AxiosClientManager.instance = new AxiosClientManager({
        baseURL,
        tokenName,
      });
    }

    return AxiosClientManager.instance;
  }

  addToken(token: string): void {
    this.client.defaults.headers.common = {
      Authorization: `Token ${token}`,
    };
    localStorage.setItem(this.tokenName, token);
  }

  removeToken(): void {
    try {
      localStorage.removeItem(this.tokenName);
      localStorage.removeItem("permissions");
      delete this.client.defaults.headers.common.Authorization;
    } catch (error) {
      console.log("The ERROR", error);
    }
  }

  loadToken(): void {
    const token = localStorage.getItem(this.tokenName);
    if (token) {
      this.client.defaults.headers.common = {
        Authorization: `Token ${token}`,
      };
    }
  }
}

export const mainAxiosClientManager = AxiosClientManager.getInstance({
  baseURL: REACT_APP_API_URL,
  tokenName: "main_token",
});
