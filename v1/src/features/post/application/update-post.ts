import { PostRepository } from "../domain/post.repository";
import { Post } from "../domain/post.types";
import { canUpdatePost } from "../domain/post.rules";
import { User } from "@/features/user/domain/user.types";
import { PermissionError, ValidationError, NotFoundError } from "@/shared/domain/errors";
import { z } from "zod";

export const updatePostSchema = z.object({
  id: z.string().min(1, "投稿IDは必須です"),
  title: z.string().min(1, "タイトルは必須です"),
  body: z.string().min(1, "本文は必須です"),
  userId: z.string().min(1, "ユーザーIDは必須です"),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;

export const updatePost = async ({
  postRepository,
  user,
  post,
}: {
  postRepository: PostRepository;
  user: User;
  post: UpdatePost;
}): Promise<Post> => {
  // バリデーション
  const validationResult = updatePostSchema.safeParse(post);
  if (!validationResult.success) {
    const errors = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    throw new ValidationError(errors);
  }

  // 既存の投稿を取得
  let existingPost: Post;
  try {
    existingPost = await postRepository.getPost(validationResult.data.id);
  } catch (error) {
    throw new NotFoundError(`投稿ID ${validationResult.data.id} の投稿が見つかりません`);
  }

  // ドメインルールによる権限チェック
  if (!canUpdatePost(user, existingPost)) {
    throw new PermissionError("この投稿を更新する権限がありません");
  }

  return postRepository.updatePost(validationResult.data.id, validationResult.data);
};
