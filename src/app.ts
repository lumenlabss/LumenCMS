import express from "express";
import session from "express-session";
import path from "path";
import dashboardRoutes from "./routes/dashboardRoutes";
import loginRoutes from "./routes/loginRoutes";
import registerRoutes from "./routes/registerRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Session Middleware
app.use(
  session({
    secret: "complex_and_secure_secret_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Views
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Routes
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// Route Home (accessible sans connexion)
app.get("/", (req, res) => {
  res.render("home"); // Page d'accueil
});

// Route Dashboard (protégée par authentification)
app.use(
  "/dashboard",
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login"); // Redirige si l'utilisateur n'est pas connecté
    }
    next(); // Si connecté, passe à la route suivante
  },
  dashboardRoutes
);

export default app;
