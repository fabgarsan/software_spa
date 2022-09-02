import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";
import { API_ROUTES } from "@utils/constants";
import { CitySearch } from "@dto/geography";

const client = mainAxiosClient.getInstance();

export const fetchCities = (
  search: string
): Promise<AxiosResponse<CitySearch[]>> =>
  client.get(`${API_ROUTES.GEOGRAPHY_CITIES}`, {
    params: { search },
  });
