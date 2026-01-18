"use client";

import { useState } from "react";
import { ApiResponse, Jwt } from "@/features/auth/domain/auth.types";
import { AppError } from "@/shared/domain/errors";

interface PresenterProps {
  onSignin: (data: { email: string; password: string }) => Promise<ApiResponse<Jwt>>;
}

export const Presenter = ({ onSignin }: PresenterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await onSignin({ email, password });
      // 成功時の処理（リダイレクトなど）
      console.log("Sign in successful:", response);
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("サインインに失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "サインイン中..." : "サインイン"}
        </button>
      </form>
    </div>
  );
};
