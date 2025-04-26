export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// Session
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
