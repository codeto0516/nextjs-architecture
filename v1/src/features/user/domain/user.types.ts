export interface User {
  id: string;
  name: string;
  email: string;
}

export type NewUser = {
  name: string;
  email: string;
  password: string;
};
