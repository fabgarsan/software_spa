import axios from "axios";

export const addTokenAxios = (token: string) => {
  axios.defaults.headers.common = {
    "Authorization": `Token ${token}`,
  };
}