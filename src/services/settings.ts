import { apiClient } from "./api-client";
import { UploadProfilePictureResponse } from "@/types/settings";

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
