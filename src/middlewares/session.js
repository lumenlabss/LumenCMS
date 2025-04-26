const session = require("express-session");
const config = require("../../config.json");

module.exports = session({
  secret: config.SESSION_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.NODE_ENV === "production" },
});
