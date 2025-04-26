import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Chemin du fichier de base de données
const dbPath = path.join(__dirname, "../../../data/database.db");

// Vérifie si le répertoire existe, sinon le créer
const dirPath = path.dirname(dbPath);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true }); // Crée le répertoire si il n'existe pas
}

// Crée la base de données si elle n'existe pas
const db = new Database(dbPath);

// Crée la table 'users' si elle n'existe pas
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    user TEXT UNIQUE,
    password TEXT
  )
  `
).run();

export default db;
