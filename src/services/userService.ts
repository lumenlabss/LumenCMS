import db from "../database/database";
import { User, UserRow } from "../types/user";

// Fonction pour obtenir un utilisateur par email
export const getUserByEmail = (email: string): User | null => {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined; // Cast explicite

  if (!row) {
    return null; // Aucun utilisateur trouvé
  }

  const user: User = {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    role: row.role || "user", // Rôle par défaut "user" si non défini
  };

  return user;
};
