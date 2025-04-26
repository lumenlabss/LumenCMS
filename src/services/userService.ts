import db from "../database/database";
import { User, UserRow } from "../types/user";

// Fonction pour obtenir un utilisateur par email
export const getUserByEmail = (email: string): User | null => {
  // Exécution de la requête pour obtenir l'utilisateur par email
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined;

  if (!row) {
    return null; // Aucun utilisateur trouvé
  }

  // Transformation de la ligne de la base de données en objet User
  const user: User = {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    role: row.role || "user", // Rôle par défaut "user" si non défini
  };

  return user;
};
