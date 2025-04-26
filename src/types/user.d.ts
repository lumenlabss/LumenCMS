// Définir l'interface UserRow, qui représente les données de l'utilisateur depuis la base de données
export interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | null;
}

// Définir l'interface User pour l'utilisateur authentifié dans la session
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// Déclarer l'extension de l'interface `SessionData` pour ajouter `user` dans la session
declare module "express-session" {
  interface SessionData {
    user?: User; // Marque l'utilisateur comme optionnel dans la session
  }
}
