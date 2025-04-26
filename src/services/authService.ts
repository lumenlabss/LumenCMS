// src/services/authService.ts

import bcrypt from "bcryptjs";
import db from "../database/database";
import { User } from "../types/user";

// Function to validate user credentials (check email & password)
export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<boolean> => {
  // Fetch the user by email from the database
  const user: User | undefined = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (!user) {
    return false; // No user found
  }

  // Compare plain password with hashed password
  const isMatch = await bcrypt.compare(password, user.password); // Assure that user.password exists
  return isMatch; // Return true if passwords match
};

// Function to create a new user with hashed password
export const createUser = async (
  email: string,
  username: string,
  password: string
): Promise<void> => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  db.prepare(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"
  ).run(email, username, hashedPassword);
};

// Function to update the user's password
export const updatePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in the database
  db.prepare("UPDATE users SET password = ? WHERE email = ?").run(
    hashedPassword,
    email
  );
};
