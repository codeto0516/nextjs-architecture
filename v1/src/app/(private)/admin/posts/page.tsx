import { PostList } from "@/features/post/presentation/components/post-list";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostList />
    </Suspense>
  );
}
