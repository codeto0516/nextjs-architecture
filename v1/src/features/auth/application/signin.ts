import { AuthRepository } from "../domain/auth.repository";
import { ApiResponse, Jwt } from "../domain/auth.types";
import { canSignin } from "../domain/auth.rules";
import { PermissionError, ValidationError, AuthenticationError } from "@/shared/domain/errors";
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export type Signin = z.infer<typeof signinSchema>;

export const signin = async ({
  authRepository,
  data,
}: {
  authRepository: AuthRepository;
  data: Signin;
}): Promise<ApiResponse<Jwt>> => {
  // バリデーション
  const validationResult = signinSchema.safeParse(data);
  if (!validationResult.success) {
    const errors = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    throw new ValidationError(errors);
  }

  // ドメインルールによる権限チェック
  if (!canSignin(validationResult.data.email, validationResult.data.password)) {
    throw new PermissionError("サインインする権限がありません");
  }

  try {
    const response = await authRepository.signin(validationResult.data);
    
    // APIレスポンスのエラーチェック
    if (response.status !== 200 || !response.data) {
      throw new AuthenticationError(response.message || "認証に失敗しました");
    }

    return response;
  } catch (error) {
    if (error instanceof AuthenticationError || error instanceof PermissionError) {
      throw error;
    }
    throw new AuthenticationError("認証に失敗しました");
  }
};
