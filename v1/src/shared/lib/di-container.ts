import { AuthRepository } from "@/features/auth/domain/auth.repository";
import { PostRepository } from "@/features/post/domain/post.repository";
import { UserRepository } from "@/features/user/domain/user.repository";
import { createAuthRepository } from "@/features/auth/infrastructure/auth.repository.api";
import { createPostRepository } from "@/features/post/infrastructure/post.repository.api";
import { createUserRepository } from "@/features/user/infrastructure/user.repository.api";

/**
 * 依存性注入コンテナ
 * プレゼンテーション層からインフラストラクチャ層への直接依存を防ぐ
 */
class DIContainer {
  private _authRepository: AuthRepository | null = null;
  private _postRepository: PostRepository | null = null;
  private _userRepository: UserRepository | null = null;

  get authRepository(): AuthRepository {
    if (!this._authRepository) {
      this._authRepository = createAuthRepository();
    }
    return this._authRepository;
  }

  get postRepository(): PostRepository {
    if (!this._postRepository) {
      this._postRepository = createPostRepository();
    }
    return this._postRepository;
  }

  get userRepository(): UserRepository {
    if (!this._userRepository) {
      this._userRepository = createUserRepository();
    }
    return this._userRepository;
  }

  /**
   * テスト用：リポジトリをモックで置き換える
   */
  setAuthRepository(repository: AuthRepository): void {
    this._authRepository = repository;
  }

  setPostRepository(repository: PostRepository): void {
    this._postRepository = repository;
  }

  setUserRepository(repository: UserRepository): void {
    this._userRepository = repository;
  }

  /**
   * テスト用：すべてのリポジトリをリセット
   */
  reset(): void {
    this._authRepository = null;
    this._postRepository = null;
    this._userRepository = null;
  }
}

// シングルトンインスタンス
export const diContainer = new DIContainer();
