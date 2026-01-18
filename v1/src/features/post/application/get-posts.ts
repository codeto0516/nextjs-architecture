import { PostRepository } from "../domain/post.repository";
import { Post } from "../domain/post.types";

export const getPosts = async ({
  postRepository,
}: {
  postRepository: PostRepository;
}): Promise<Post[]> => {
  try {
    return await postRepository.getPosts();
  } catch (error) {
    // エラーが発生した場合は空配列を返すか、エラーを再スロー
    // ここでは空配列を返す（ビジネス要件に応じて変更可能）
    console.error("投稿の取得に失敗しました:", error);
    return [];
  }
};
