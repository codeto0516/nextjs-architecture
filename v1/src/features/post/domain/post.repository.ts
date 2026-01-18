import { NewPost, Post } from "./post.types";

export interface PostRepository {
  getPost(id: string): Promise<Post>;
  getPosts(): Promise<Post[]>;
  createPost(post: NewPost): Promise<Post>;
  updatePost(id: string, post: Post): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
