export interface CreateKycRequest {
  school: string;
  faculty: string;
  department: string;
  currentLevel: string;
  course: string;
  entryYear: string;
  modeOfStudy: string;
  expectedGraduation: string;
  currentResidence: string;
}

export interface KycData {
  _id: string;
  userId: string;
  school: string;
  faculty: string;
  department: string;
  currentLevel: string;
  course: string;
  entryYear: string;
  modeOfStudy: string;
  expectedGraduation: string;
  currentResidence: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface KycResponse {
  success: boolean;
  statusCode: number;
  message: KycData;
  data: string;
}
