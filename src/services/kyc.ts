import { apiClient } from "./api-client";
import { CreateKycRequest, KycResponse } from "@/types/kyc";

export const kycService = {
  createKYC: async (data: CreateKycRequest): Promise<KycResponse> => {
    const response = await apiClient.post<KycResponse>("/kyc/createKYC", data);
    return response.data;
  },
};
