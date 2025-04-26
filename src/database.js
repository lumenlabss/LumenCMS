const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Specify the path to the SQLite3 database
const dbPath = path.join(__dirname, "..", "data", "lumenCMS.db");

// Create or open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database");
  }
});

// Export the database for use in other parts of the app
module.exports = db;
