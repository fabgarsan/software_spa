import { ExtendedUser } from "@dbTypes/index";

export interface EscortService {
  id: number;
  name: string;
  nameEn: string;
}

export interface EscortCategory {
  id: number;
  name: string;
  order: number;
}

export interface Escort extends ExtendedUser {
  categoryName: string;
  alias: string;
  services: number[];
  city: number | undefined;
  cityName: string | undefined;
  departmentName: string | undefined;
  countryName: string | undefined;
  category: number | undefined;
}
