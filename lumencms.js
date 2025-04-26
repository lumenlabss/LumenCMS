const express = require("express");
const path = require("path");
const config = require("./src/config");
const loadRoutes = require("./src/routes");
const morganMiddleware = require("./src/middlewares/morgan"); // Import custom morgan middleware
const {
  cookieMiddleware,
  bodyMiddleware,
  sessionMiddleware,
} = require("./src/middlewares"); // Import other middlewares

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Inject config into views
app.use((req, res, next) => {
  res.locals.config = config;
  next();
});

// Use morgan middleware for logging
app.use(morganMiddleware); // This will conditionally log requests based on your NODE_ENV

// Load routes
app.use(loadRoutes); // Load other routes

// Middleware for static files
app.use(express.static(path.join(__dirname, "public")));

// 404 error handling
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// Global error handling
if (config.NODE_ENV === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Something went wrong!");
  });
}

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, config.HOSTNAME, () => {
  console.log(
    `Server running on ${config.HOSTNAME}:${PORT} in ${config.NODE_ENV} mode`
  );
});

module.exports = app;
