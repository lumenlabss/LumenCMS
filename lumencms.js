const express = require("express");
const path = require("path");
const config = require("./config.json");
const db = require("./src/database");

// Middlewares
const morganMiddleware = require("./src/middlewares/morgan");
const cookieMiddleware = require("./src/middlewares/cookieParser");
const bodyMiddleware = require("./src/middlewares/bodyParser");
const sessionMiddleware = require("./src/middlewares/session");

// Initialize Express app
const app = express();

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Apply middlewares
app.use(morganMiddleware);
app.use(cookieMiddleware);
app.use(bodyMiddleware.urlencoded);
app.use(bodyMiddleware.json);
app.use(sessionMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Example route using SQLite database
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render("users", { users: rows });
  });
});

// Import routes
const adminRoutes = require("./src/routes/admin");
const userRoutes = require("./src/routes/user");

// Homepage
app.get("/", (req, res) => {
  res.render("home/index");
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// Error management
if (config.NODE_ENV === "development") {
  // In development, displays error details
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  // In production, detailed errors are not shown
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Something went wrong!");
  });
}

// Start server
const PORT = config.PORT || 3000;
app.listen(PORT, config.HOSTNAME, () => {
  console.log(
    `Server running on ${config.HOSTNAME}:${PORT} in ${config.NODE_ENV} mode`
  );
});

module.exports = app;
