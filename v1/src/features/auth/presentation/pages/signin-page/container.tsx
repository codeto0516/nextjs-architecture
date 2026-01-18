"use client";

import { signin } from "@/features/auth/application/signin";
import { diContainer } from "@/shared/lib/di-container";
import { Presenter } from "./presenter";

export const Container = () => {
  const handleSignin = async (data: { email: string; password: string }) => {
    try {
      const response = await signin({
        authRepository: diContainer.authRepository,
        data,
      });
      return response;
    } catch (error) {
      // エラーハンドリングはPresenterで行う
      throw error;
    }
  };

  return <Presenter onSignin={handleSignin} />;
};
