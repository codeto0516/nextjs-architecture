import { AuthRepository } from "../domain/auth.repository";
import { ApiResponse } from "../domain/auth.types";
import { canRegister } from "../domain/auth.rules";
import { PermissionError, ValidationError } from "@/shared/domain/errors";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export type Register = z.infer<typeof registerSchema>;

export const register = async ({
  authRepository,
  data,
}: {
  authRepository: AuthRepository;
  data: Register;
}): Promise<ApiResponse> => {
  // バリデーション
  const validationResult = registerSchema.safeParse(data);
  if (!validationResult.success) {
    const errors = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    throw new ValidationError(errors);
  }

  // ドメインルールによる権限チェック
  if (!canRegister(validationResult.data.email)) {
    throw new PermissionError("ユーザーは登録する権限がありません");
  }

  return authRepository.register(validationResult.data);
};
