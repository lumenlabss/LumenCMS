import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(__dirname, "../../../data/database.db"));

// Create users table if it doesn't exist
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
