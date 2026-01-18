import { User } from "@/features/user/domain/user.types";
import { Post } from "./post.types";

/**
 * 投稿を作成できるかどうかを判定
 * @param user ユーザー
 * @returns 作成可能な場合true
 */
export const canCreatePost = (user: User): boolean => {
  // ユーザーが存在し、有効な場合のみ投稿可能
  if (!user || !user.id) {
    return false;
  }
  return true;
};

/**
 * 投稿を更新できるかどうかを判定
 * @param user ユーザー
 * @param post 投稿
 * @returns 更新可能な場合true
 */
export const canUpdatePost = (user: User, post: Post): boolean => {
  // ユーザーが存在しない場合は更新不可
  if (!user || !user.id) {
    return false;
  }
  // 投稿の所有者のみ更新可能
  return user.id === post.userId;
};

/**
 * 投稿を削除できるかどうかを判定
 * @param user ユーザー
 * @param post 投稿
 * @returns 削除可能な場合true
 */
export const canDeletePost = (user: User, post: Post): boolean => {
  // ユーザーが存在しない場合は削除不可
  if (!user || !user.id) {
    return false;
  }
  // 投稿の所有者のみ削除可能
  return user.id === post.userId;
};
