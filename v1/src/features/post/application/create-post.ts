import { PostRepository } from "../domain/post.repository";
import { Post } from "../domain/post.types";
import { canCreatePost } from "../domain/post.rules";
import { User } from "@/features/user/domain/user.types";
import { PermissionError, ValidationError } from "@/shared/domain/errors";
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  body: z.string().min(1, "本文は必須です"),
  userId: z.string().min(1, "ユーザーIDは必須です"),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export const createPost = async ({
  postRepository,
  user,
  post,
}: {
  postRepository: PostRepository;
  user: User;
  post: CreatePost;
}): Promise<Post> => {
  // バリデーション
  const validationResult = createPostSchema.safeParse(post);
  if (!validationResult.success) {
    const errors = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    throw new ValidationError(errors);
  }

  // ドメインルールによる権限チェック
  if (!canCreatePost(user)) {
    throw new PermissionError("ユーザーは投稿を作成する権限がありません");
  }

  return postRepository.createPost(validationResult.data);
};
