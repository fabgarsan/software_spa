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

export interface ExtendedUser extends User {
  firstThree: string;
  lastThree: string;
  idType: "CC" | "CE" | "PS" | "NI" | string;
  idNumber: string;
  gender: "F" | "M";
  userType: UserType;
  dateOfBirth: string;
}
