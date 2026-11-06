import { apiClient } from "./api-client";
import { isAxiosError } from "axios";
import { CreateKycRequest, KycData, KycResponse } from "@/types/kyc";

export const kycService = {
  getKYC: async (): Promise<KycData | null> => {
    try {
      const response = await apiClient.get<KycResponse>("/kyc/getKYC");

      if (!response.data.success) {
        if (response.data.statusCode === 404) {
          return null;
        }
        throw new Error(response.data.message || "Could not load KYC data.");
      }

      const data = response.data.data;
      if (data === null) {
        return null;
      }
      if (typeof data !== "object" || Array.isArray(data)) {
        throw new Error("The KYC response did not contain a valid record.");
      }

      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  createKYC: async (data: CreateKycRequest): Promise<KycResponse> => {
    const response = await apiClient.post<KycResponse>("/kyc/createKYC", data);
    return response.data;
  },

  editKYC: async (data: CreateKycRequest): Promise<KycResponse> => {
    const response = await apiClient.put<KycResponse>("/kyc/editKYC", data);
    return response.data;
  },
};
