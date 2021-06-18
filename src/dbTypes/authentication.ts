import { UserType } from "@dbTypes/users";

export interface SignInControl {
  id: number;
  user: number;
  fullName: string;
  signInDatetime: Date;
  categoryName: string;
  userType: UserType;
  signOutDatetime: Date | null;
}
