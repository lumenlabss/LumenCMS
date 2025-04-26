/*
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 *      LumenCMS - Open Source Project by LumenLabs
 *
 *     © 2025 LumenLabs. Licensed under the MIT License
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 */
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

// Session
app.use(
  session({
    secret: "ton_secret_ici",
    resave: false,
    saveUninitialized: true,
  })
);

// Views
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Routes
app.use("/", loginRoutes);
app.use("/", registerRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
