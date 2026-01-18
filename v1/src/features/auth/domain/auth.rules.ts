/**
 * ユーザー登録が可能かどうかを判定
 * @param email メールアドレス
 * @returns 登録可能な場合true
 */
export const canRegister = (email: string): boolean => {
  // メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

/**
 * サインインが可能かどうかを判定
 * @param email メールアドレス
 * @param password パスワード
 * @returns サインイン可能な場合true
 */
export const canSignin = (email: string, password: string): boolean => {
  // メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  // パスワードの最小長チェック
  if (password.length < 8) {
    return false;
  }
  return true;
};
