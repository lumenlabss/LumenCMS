import bcrypt from "bcryptjs";
import db from "../database/database";
import { User } from "../types/user";

// Function to validate user credentials
export const validateUserCredentials = (
  user: User,
  password: string
): boolean => {
  return user.password === password; // Compare plain password with stored one
};

// Function to create a new user
export const createUser = (email: string, password: string): void => {
  db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(
    email,
    password
  );
};

// Function to hash a password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate salt for hashing
  return bcrypt.hash(password, salt); // Hash and return the password
};

// Function to compare plain password with hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword); // Compare plain password with hashed one
};

// Function to update password (optional)
export const updatePassword = (email: string, newPassword: string): void => {
  const hashedPassword = bcrypt.hashSync(newPassword, 10); // Hash new password
  db.prepare("UPDATE users SET password = ? WHERE email = ?").run(
    hashedPassword,
    email
  );
};
