import { ExtendedUser } from "@dbTypes/index";

export interface EscortCategory {
  id: number;
  name: string;
  order: number;
}

export interface Escort extends ExtendedUser {
  categoryName: string;
  alias: string;
  category: number | undefined;
}
