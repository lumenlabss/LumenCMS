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

    // Create the users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        username TEXT NOT NULL,
        rank TEXT DEFAULT 'default' CHECK (rank IN ('default', 'admin'))
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table 'user' is ready");

          // Check if there is an admin user, and create one if not
          db.get(
            "SELECT COUNT(*) AS count FROM user WHERE rank = 'admin'",
            (err, row) => {
              if (err) {
                console.error("Error checking for admin user:", err.message);
              } else if (row.count === 0) {
                // No admin user found, create one
                const adminUser = {
                  email: "admin@lumen.com",
                  password: "admin123", // You should hash this password in a real app
                  username: "admin",
                  rank: "admin",
                };

                db.run(
                  `INSERT INTO user (email, password, username, rank) VALUES (?, ?, ?, ?)`,
                  [
                    adminUser.email,
                    adminUser.password,
                    adminUser.username,
                    adminUser.rank,
                  ],
                  (err) => {
                    if (err) {
                      console.error("Error inserting admin user:", err.message);
                    } else {
                      console.log("Admin user created successfully.");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

// Export the database for use in other parts of the app
module.exports = db;
