import { UserType } from "@dbTypes/users";

export interface SignInControl {
  id: number;
  user: number;
  fullName: string;
  signInDatetime: string;
  categoryName: string;
  userType: UserType;
  signOutDatetime: string | null;
}
