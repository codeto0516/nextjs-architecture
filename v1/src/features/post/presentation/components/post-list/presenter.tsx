import { Post } from "@/features/post/domain/post.types";

interface PresenterProps {
  posts: Post[];
}

export const Presenter = ({ posts }: PresenterProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
