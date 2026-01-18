import { apiClient } from "@/shared/lib/api-client";
import { UserRepository } from "../domain/user.repository";

export const userRepository: UserRepository = {
  getUser: async (id) => {
    return apiClient.get(`/posts/${id}`);
  },
  getUsers: async () => {
    return apiClient.get(`/posts`);
  },
  createUser: async (user) => {
    return apiClient.post(`/posts`, user);
  },

  updateUser: async (id, user) => {
    return apiClient.put(`/posts/${id}`, user);
  },
  deleteUser: async (id) => {
    return apiClient.delete(`/posts/${id}`);
  },
};

// 依存性注入用のファクトリー関数
export const createUserRepository = (): UserRepository => userRepository;
