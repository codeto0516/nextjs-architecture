import { apiClient } from "@/shared/lib/api-client";
import { AuthRepository } from "../domain/auth.repository";
import { ApiResponse, Jwt, RegisterData, SigninData } from "../domain/auth.types";

export const authRepository: AuthRepository = {
  register: async (data: RegisterData) => {
    return apiClient.post<ApiResponse>("/auth/register", data);
  },
  signin: async (data: SigninData) => {
    return apiClient.post<ApiResponse<Jwt>>("/auth/signin", data);
  },
};

// 依存性注入用のファクトリー関数
export const createAuthRepository = (): AuthRepository => authRepository;
