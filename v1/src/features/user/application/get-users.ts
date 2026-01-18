import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.types";

export const getUsers = async ({
  userRepository,
}: {
  userRepository: UserRepository;
}): Promise<User[]> => {
  try {
    return await userRepository.getUsers();
  } catch (error) {
    // エラーが発生した場合は空配列を返すか、エラーを再スロー
    // ここでは空配列を返す（ビジネス要件に応じて変更可能）
    console.error("ユーザーの取得に失敗しました:", error);
    return [];
  }
};
