import { AxiosResponse } from "axios";
import { mainAxiosClientManager } from "@clients/axios";
import { API_ROUTES } from "@utils/constants";
import { CitySearch } from "@dto/geography";

const { client } = mainAxiosClientManager;

export const fetchCities = (
  search: string
): Promise<AxiosResponse<CitySearch[]>> =>
  client.get(`${API_ROUTES.GEOGRAPHY_CITIES}`, {
    params: { search },
  });
