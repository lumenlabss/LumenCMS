/*
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 *      LumenOne - Open Source Project by LumenLabs
 *
 *     © 2025 LumenLabs. Licensed under the MIT License
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 */

const express = require("express");
const config = require("./config/config.json");
const ejs = require("ejs");
const AuthLoginRouter = require("./src/routes/auth/login");

// Application initialization
const app = express();

// Pages
app.use("/", AuthLoginRouter);

// Start web server
const port = config.port || 3000;
const hostname = config.hostname || "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
