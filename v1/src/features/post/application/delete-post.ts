import { PostRepository } from "../domain/post.repository";
import { canDeletePost } from "../domain/post.rules";
import { User } from "@/features/user/domain/user.types";
import { PermissionError, NotFoundError } from "@/shared/domain/errors";

export const deletePost = async ({
  postRepository,
  user,
  postId,
}: {
  postRepository: PostRepository;
  user: User;
  postId: string;
}): Promise<void> => {
  if (!postId || postId.trim() === "") {
    throw new NotFoundError("投稿IDが指定されていません");
  }

  // 既存の投稿を取得
  let existingPost;
  try {
    existingPost = await postRepository.getPost(postId);
  } catch (error) {
    throw new NotFoundError(`投稿ID ${postId} の投稿が見つかりません`);
  }

  // ドメインルールによる権限チェック
  if (!canDeletePost(user, existingPost)) {
    throw new PermissionError("この投稿を削除する権限がありません");
  }

  await postRepository.deletePost(postId);
};
