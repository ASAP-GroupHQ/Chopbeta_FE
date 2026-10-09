import { apiClient } from "./api-client";
import { UploadProfilePictureResponse } from "@/types/settings";

export interface SendFeedbackRequest {
  fullName: string;
  email: string;
  message: string;
  rating: number;
}

export interface SendFeedbackResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
    email: string;
    message: string;
    rating: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const sendFeedback = async (
  feedback: SendFeedbackRequest,
): Promise<SendFeedbackResponse> => {
  const response = await apiClient.post<SendFeedbackResponse>(
    "/auth/user/send-feedback",
    feedback,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Could not send your feedback.");
  }

  return response.data;
};

export interface UpdateProfileRequest {
  gender: string;
  dateOfBirth: string;
  LGA: string;
  countryOfResidence: string;
  houseAddress: string;
  stateOfOrigin: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export const updateProfile = async (
  profile: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>(
    "/auth/user/update-profile",
    profile,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Could not update your profile.");
  }

  return response.data;
};

export const uploadProfilePicture = async (
  file: File,
): Promise<UploadProfilePictureResponse> => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  const response = await apiClient.post<UploadProfilePictureResponse>(
    "/auth/user/upload-profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
