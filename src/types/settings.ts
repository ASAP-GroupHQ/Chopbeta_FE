export interface ProfilePictureData {
  fullName: string;
  profilePicture: string;
}

export interface UploadProfilePictureResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProfilePictureData;
}
