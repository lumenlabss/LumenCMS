/*
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 *      LumenOne - Open Source Project by LumenLabs
 *
 *     © 2025 LumenLabs. Licensed under the MIT License
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 */

const express = require("express");
const expressSession = require("express-session");
const config = require("./config/config.json");
const ejs = require("ejs");
const HomeRouter = require("./src/routes/home.js");
const applyTheme = require("./src/middlewares/theme");

// Application initialization
const app = express();
applyTheme(app);

// Pages
app.use("/", HomeRouter);

// Start web server
const port = config.port || 3000;
const hostname = config.hostname || "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
