export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

export type NewPost = {
  title: string;
  body: string;
  userId: string;
};
