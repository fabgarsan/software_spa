export type UserType = "T" | "C" | "A";

export interface User {
  id: number;
  firstName: string;
  fullName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
}

export type GenderType = "M" | "F";

export type BloodType =
  | "NI"
  | "APOSITIVO"
  | "ANEGATIVO"
  | "BPOSITIVO"
  | "BNEGATIVO"
  | "OPOSITIVO"
  | "ONEGATIVO"
  | "ABPOSITIVO"
  | "ABNEGATIVO";

export interface ExtendedUser extends User {
  firstThree: string;
  lastThree: string;
  idType: "CC" | "CE" | "PS" | "NI" | string;
  idNumber: string;
  gender: GenderType;
  userType: UserType;
  dateOfBirth: Date;
  bloodType: BloodType;
}
