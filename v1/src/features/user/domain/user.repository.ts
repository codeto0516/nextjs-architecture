import { NewUser, User } from "./user.types";

export interface UserRepository {
  getUser(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  createUser(user: NewUser): Promise<User>;
  updateUser(id: string, user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
