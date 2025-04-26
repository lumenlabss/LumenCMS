export interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
