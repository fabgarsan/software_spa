import axios, { AxiosInstance } from "axios";

class AxiosClientManager {
  client: AxiosInstance;

  tokenName: string;

  constructor(baseUrl: string, tokenName: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    });
    this.tokenName = tokenName;
    this.loadToken();
  }

  addToken(token: string): void {
    this.client.defaults.headers.common = {
      Authorization: `Token ${token}`,
    };
    localStorage.setItem(this.tokenName, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem("permissions");
    delete this.client.defaults.headers.common.Authorization;
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

export const mainAxiosClientManager = new AxiosClientManager(
  process.env?.REACT_APP_API_URL || "",
  "main_token"
);
