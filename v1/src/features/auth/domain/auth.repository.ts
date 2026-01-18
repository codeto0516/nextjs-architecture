import { ApiResponse, Jwt, RegisterData, SigninData } from "./auth.types";

export interface AuthRepository {
  register(data: RegisterData): Promise<ApiResponse>;
  signin(data: SigninData): Promise<ApiResponse<Jwt>>;
}
