import { apiClient } from "@/shared/lib/api-client";
import { PostRepository } from "../domain/post.repository";
import { Post } from "../domain/post.types";

export const postRepository: PostRepository = {
  getPost: async (postId): Promise<Post> => {
    const response = await apiClient.get<ResponsePost>(`/posts/${postId}`);
    return toDomain(response);
  },
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get<ResponsePost[]>("/posts");
    return response.map(toDomain);
  },

  createPost: async (post): Promise<Post> => {
    const response = await apiClient.post<ResponsePost>(`/posts`, post);
    return toDomain(response);
  },

  updatePost: async (postId, post): Promise<Post> => {
    const response = await apiClient.put<ResponsePost>(
      `/posts/${postId}`,
      post
    );
    return toDomain(response);
  },
  deletePost: async (postId): Promise<void> => {
    await apiClient.delete<ResponsePost>(`/posts/${postId}`);
    return;
  },
};

// 依存性注入用のファクトリー関数
export const createPostRepository = (): PostRepository => postRepository;

const toDomain = (response: ResponsePost): Post => {
  return response;
};

interface ResponsePost {
  id: string;
  title: string;
  body: string;
  userId: string;
}
