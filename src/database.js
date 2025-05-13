const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Database initialization
const db = new sqlite.Database("lumencms.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Function to create user table if it doesn't exist
const createUserTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      first-name TEXT NOT NULL, 
      last-name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL UNIQUE,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      country TEXT NOT NULL,
      zip TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Error creating users table: " + err.message);
      } else {
        console.log("Users table created or already exists.");
      }
    }
  );
};
