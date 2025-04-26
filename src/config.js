const config = require("../config.json");

module.exports = {
  PORT: config.PORT || 3000,
  HOSTNAME: config.HOSTNAME,
  NODE_ENV: config.NODE_ENV,
  SESSION_SECRET: config.SESSION_SECRET || "defaultsecret",
  NAME: config.NAME,
};
