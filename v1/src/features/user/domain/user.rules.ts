import { User } from "./user.types";

export const canCreateUser = (): boolean => {
  return true;
};

export const canUpdateUser = (currentUser: User, targetUser: User): boolean => {
  return currentUser.id === targetUser.id;
};

export const canDeleteUser = (currentUser: User, targetUser: User): boolean => {
  return currentUser.id === targetUser.id;
};
