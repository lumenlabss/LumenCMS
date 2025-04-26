import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import db from "../database/database";
import { UserRow } from "../types/user";

// Fonction pour valider les identifiants de l'utilisateur
export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<boolean> => {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined;

  if (!user) {
    return false; // Aucun utilisateur trouvé
  }

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

// Fonction pour créer un nouvel utilisateur avec mot de passe haché
export const createUser = async (
  email: string,
  username: string,
  password: string
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"
  ).run(email, username, hashedPassword);
};

// Fonction pour mettre à jour le mot de passe de l'utilisateur
export const updatePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  db.prepare("UPDATE users SET password = ? WHERE email = ?").run(
    hashedPassword,
    email
  );
};

// Fonction pour récupérer un utilisateur par son email
export const getUserByEmail = (email: string): UserRow | null => {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!row) {
    return null;
  }
  return row as UserRow;
};

// Fonction pour afficher la page de login
export const loginPage = (req: Request, res: Response): void => {
  res.render("auth/login");
};

// Fonction pour gérer la connexion de l'utilisateur
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(400).send("Utilisateur non trouvé");
    return; // Ajout du return pour éviter que le code continue après le send
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).send("Mot de passe incorrect");
    return; // Ajout du return pour éviter que le code continue après le send
  }

  // On ne stocke pas le mot de passe dans la session
  (req.session as any).user = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role || "user",
  };

  res.redirect("/dashboard");
};

// Fonction pour afficher la page d'inscription
export const registerPage = (req: Request, res: Response): void => {
  res.render("auth/register");
};

// Fonction pour gérer l'inscription d'un utilisateur
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, username, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    res.status(400).send("L'email est déjà utilisé");
    return; // Ajout du return pour éviter que le code continue après le send
  }

  await createUser(email, username, password);
  res.redirect("/login");
};
