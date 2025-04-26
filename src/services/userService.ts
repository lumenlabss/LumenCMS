// src/services/userService.ts

import db from "../database/database";
import { User } from "../types/user";

// Define the type for the row result
interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: string; // Role is optional in case it's not set
}

// Function to get a user by email from the database
export const getUserByEmail = (email: string): User | null => {
  const row: UserRow | undefined = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (!row) {
    return null; // No user found
  }

  // Return the user object
  const user: User = {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    role: row.role || "user", // Default role can be set here
  };

  return user;
};
