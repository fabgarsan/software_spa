export interface EscortCategory {
  id: number;
  name: string;
  order: number;
}

export interface Escort {
  id: number;
  firstName: string;
  fullName: string;
  lastName: string;
  categoryName: string;
  alias: string;
  username: string;
  email: string;
  gender: "F" | "M";
  idType: "CC" | "CE" | "PS" | "NI" | string;
  idNumber: string;
  password: string;
  userType: string;
  dateOfBirth: string;
  category: number | undefined;
}
