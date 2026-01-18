export interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface Jwt {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  message: string;
  status: number;
}

export type RegisterData = {
  email: string;
  password: string;
};

export type SigninData = {
  email: string;
  password: string;
};
