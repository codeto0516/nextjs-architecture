import { getPosts } from "@/features/post/application/get-posts";
import { diContainer } from "@/shared/lib/di-container";
import { Presenter } from "./presenter";

export const Container = async () => {
  const posts = await getPosts({
    postRepository: diContainer.postRepository,
  });

  return <Presenter posts={posts} />;
};
