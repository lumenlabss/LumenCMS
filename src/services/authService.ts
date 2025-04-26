// src/services/authService.ts

import bcrypt from "bcryptjs";
import db from "../database/database";
import { UserRow } from "../types/user";

// Fonction pour valider les identifiants de l'utilisateur
export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<boolean> => {
  // Récupère l'utilisateur depuis la base de données et force le type
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined; // Cast explicite

  if (!user) {
    return false; // Aucun utilisateur trouvé
  }

  // Compare le mot de passe en clair avec le mot de passe haché
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
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
