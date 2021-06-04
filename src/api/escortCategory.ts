import axios from "axios";
import {addTokenAxios} from "@utils/commonFunctions";

const baseUrl = process.env.REACT_APP_API_URL;
export const loadEscortCategories = (limit: number, offset: number) => {
  const token = localStorage.getItem('token');
  if (token) {
    addTokenAxios(token)
  }
  return axios.get(`${baseUrl}/escorts-categories/`, {params: {limit, offset}})
};