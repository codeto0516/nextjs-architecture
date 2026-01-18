import { PostRepository } from "../domain/post.repository";
import { Post } from "../domain/post.types";
import { NotFoundError } from "@/shared/domain/errors";

export const getPost = async ({
  postRepository,
  postId,
}: {
  postRepository: PostRepository;
  postId: string;
}): Promise<Post> => {
  if (!postId || postId.trim() === "") {
    throw new NotFoundError("投稿IDが指定されていません");
  }

  try {
    const post = await postRepository.getPost(postId);
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new NotFoundError(`投稿ID ${postId} の投稿が見つかりません`);
  }
};
