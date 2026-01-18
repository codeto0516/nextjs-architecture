/**
 * アプリケーションエラーの基底クラス
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 権限エラー
 */
export class PermissionError extends AppError {
  constructor(message: string = "権限がありません") {
    super(message, "PERMISSION_ERROR", 403);
  }
}

/**
 * バリデーションエラー
 */
export class ValidationError extends AppError {
  constructor(message: string = "バリデーションエラーが発生しました") {
    super(message, "VALIDATION_ERROR", 400);
  }
}

/**
 * リソースが見つからないエラー
 */
export class NotFoundError extends AppError {
  constructor(message: string = "リソースが見つかりません") {
    super(message, "NOT_FOUND_ERROR", 404);
  }
}

/**
 * 認証エラー
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "認証に失敗しました") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}
