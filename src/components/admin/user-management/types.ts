export interface AdminUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  dateJoined: string;
  lastActive: string;
  avatar: string;
  gender: string;
  stateOfOrigin: string;
  LGA: string;
  houseAddress: string;
  countryOfResidence: string;
  dateOfBirth: string;
  allergies: string[];
  disLikes: string[];
  isVerified: boolean;
  isKYCVerified: boolean;
}

export type UserDialogMode = "view" | "edit" | "activate" | "deactivate";

export interface UserEdits {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  stateOfOrigin: string;
  LGA: string;
  houseAddress: string;
  countryOfResidence: string;
  dateOfBirth: string;
  allergies: string[];
  disLikes: string[];
}
